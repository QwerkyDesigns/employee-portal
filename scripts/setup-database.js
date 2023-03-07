require('dotenv').config({ path: '.env.development' });
const config = require('./../dev.config.js')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const data = {
  user_name: 'dev-user',
  email: config.email,
  password: '12345',
  stripe_customer_id: 'cus_NT3Q8CV9Ayl59L',
  usage: { create: { available_funds: 2.0 } }
};

console.log('Generated Account data:', data);

prisma.account.create({ data }).
  then(() => {
    console.log('AccountData stored in the database.');
}).catch((error) => {
    console.error('Failed to store usage data:', error);
}).finally(() => {
  prisma.$disconnect();
});
