const prisma = require('../config/prisma');

async function findAll() {
  return prisma.plan.findMany();
}

async function findById(id) {
  return prisma.plan.findUnique({ where: { id } });
}

async function createPlan(data) {
  return prisma.plan.create({ data });
}

module.exports = { findAll, findById, createPlan };