const { Kafka } = require('kafkajs');
const { getGradeListByUserId } = require('../services/gradeService');
require('dotenv').config();
const kafka = new Kafka({
  clientId: 'express-app',
  brokers: [`${process.env.IP_KAFKA}:9092`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'grade-service-group' });

async function sendGradeListRequest(userId) {
  await producer.connect();
  await producer.send({
    topic: "get-grade-list",
    messages: [{ value: JSON.stringify({ userId }) }],
  });
  await producer.disconnect();
}

const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'get-class-list', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(message);
            const { userId } = JSON.parse(message.value.toString());
            const gradeList = await getGradeListByUserId(userId);
            const producer = kafka.producer();
            await producer.connect();
            await producer.send({
              topic: "grade-list-response",
              messages: [{ value: JSON.stringify({ userId, gradeList }) }],
            });
            await producer.disconnect();
        },
    });

    console.log('Consumer is running and listening for messages...');
  } catch (err) {
    console.error('Error in consumer:', err);
  }
};

const disconnectConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log('Consumer disconnected');
  } catch (err) {
    console.error('Error disconnecting consumer:', err);
  }
};

module.exports = { kafka, producer, consumer, runConsumer, disconnectConsumer , sendGradeListRequest };