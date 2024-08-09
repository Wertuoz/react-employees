const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all = async (req, res) => {
  try {
    const employees = await prisma.employees.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: `Can't find employees` });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await prisma.employee.create({
      data: { ...data, userId: req.user.id },
    });

    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.employee.delete({ where: { id } });
    res.status(204).json("OK");
  } catch (error) {
    res.status(500).json({ message: `Can't find employee` });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({ where: { id }, data: data });
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json({ message: `Can't edit employee` });
  }
};

const employee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id } });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: `Can't find employee` });
  }
};

module.exports = { all, add, remove, edit, employee };
