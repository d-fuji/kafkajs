const ip = require('ip')

const { Kafka } = require('kafkajs')

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  brokers: [`${host}:9092`],
  clientId: 'my-app',
})

const producer = kafka.producer()

const sendMessage = () => {
  return producer
    .send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
    .then(console.log)
}

const run = async () => {
  await producer.connect()
  setInterval(sendMessage, 3000)
}

run()
