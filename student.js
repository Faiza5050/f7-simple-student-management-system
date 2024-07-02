#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 50000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Total Balance for ${chalk.magenta(this.name)} = $${chalk.yellow(this.balance)}\n`);
    }
    pay_fees(amount) {
        (this.balance -= amount);
        console.log(`${chalk.magenta(this.name)} Paid $${chalk.magenta(amount)} successfully! \n`);
        console.log(`Remaining Balance : $${chalk.yellow(this.balance)}\n`);
    }
    show_status() {
        console.log(`ID: ${chalk.blue(this.id)}`);
        console.log(`Name: ${chalk.blue(this.name)}`);
        console.log(`Courses: ${chalk.blue(this.courses)}`);
        console.log(`Balance: $${chalk.blue(this.balance)}\n`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${chalk.yellow.bold(name)} added Successfully! \nStudent ID: ${chalk.yellow.bold(student.id)}\n`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`Congratulation ${chalk.magenta(student.name)}! You have Successfully enrolled in ${chalk.magenta(course)}!\n`);
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID\n"));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID\n"));
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct student ID\n"));
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct Student ID\n"));
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(chalk.green("\n\tWelcome To Student Management System"));
    console.log(chalk.green("/*/").repeat(20));
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "Select an Option: ",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        switch (choice.option) {
            case "Add Student":
                console.log(chalk.blue("\t/*//* Add New Student *//*/"));
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter Student Name: ",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                console.log(chalk.blue("\t/*//* Enroll Student In Course *//*/"));
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Studend ID: ",
                    },
                    {
                        name: "course",
                        type: "list",
                        message: "Select Courses to Enroll: ",
                        choices: ["TypeScript", "JavaScript", "Next.js", "Python", "HTML", "Css"]
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                console.log(chalk.blue("\t/*//* View Student Balance *//*/"));
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID: ",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                console.log(chalk.blue("\t/*//* Pay Tution Fees *//*/"));
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID: ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Pay: ",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                console.log(chalk.blue("\t/*//* Show Student Status *//*/"));
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID: "
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.green("\n/*/*/ Thank You For Using Student Management System /*/*/"));
                process.exit();
        }
    }
}
main();
