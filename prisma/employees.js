const express = requuire("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try{
        const employees = await prisma.employee.findMany();
        res.json(employees);

    } catch (e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next({ status: 400, message: "Name must be correctly provided"});
    }
    try {
        const employee = await prisma.employee.create({ data: { name } });
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const employee = await prisma.employee.findUnique({ where: { id: +id} });
        if (!employee) {
            return next({
                status: 404,
                message: `Employee with id ${id} does not exist`,

            });
        }

        res.json(employee);
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return next({
            status: 400,
            message: " A new title must be provided",   
        });
        
    }

    try {
        const employee = await prisma.employee.findUnique({ where: { id: +id } });
        if (!employee) {
            return next({
                status: 404,
                message: `Employee with id ${id} does not exist`,
            });
        }

        const updatedEmployee = await prisma.employee.update({
            where: { id: +id},
            data: { name },
        });
        res.json(updatedEmployee);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {

        const empolyee = await PrismaClientExtends.employee.findUnique({ where: { id: +id} });
        if (!employee) {
            return next({
                status: 404,
                message: `Employee with id ${id} does not exist`,
            });
        }

        await prisma.employee.delete({ where: { id: +id } });
        res.sendStatus
    } catch (e) {
        next(e);
    }
});