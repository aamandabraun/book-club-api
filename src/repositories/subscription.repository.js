const prisma = require('../config/prisma');

async function findByUserId(userId) {
  return prisma.subscription.findUnique({
    where: { userId },
    include: { plan: true }
  });
}

async function createSubscription(data) {
  return prisma.subscription.create({
    data,
    include: { plan: true }
  });
}

async function updateSubscription(userId, data) {
  return prisma.subscription.update({
    where: { userId },
    data
  });
}

module.exports = { findByUserId, createSubscription, updateSubscription };