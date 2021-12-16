const ip = require('ip')

const { Kafka } = require('kafkajs')

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  brokers: [`${host}:9092`],
  clientId: 'my-app',
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString()
      })
    },
  })
}

run()
