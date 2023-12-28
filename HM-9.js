function Student(name, surname, birthYear) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.grades = {};
    this.attendance = {};
    this.courses = [];
}

Student.prototype.addGrade = function (course, grade) {
    if (!this.grades[course]) {
        this.grades[course] = [];
    }
    this.grades[course].push(grade);
};

Student.prototype.addAttendance = function (course, attendance) {
    if (!this.attendance[course]) {
        this.attendance[course] = [];
    }
    this.attendance[course].push(attendance);
};

Student.prototype.getAverage = function (arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};

Student.prototype.getAverageGrade = function (course) {
    if (this.grades[course]) {
        return this.getAverage(this.grades[course]);
    }
    return 0;
};

Student.prototype.getAverageAttendance = function (course) {
    if (this.attendance[course]) {
        return this.getAverage(this.attendance[course]);
    }
    return 0;
};

Student.prototype.addCourse = function (course) {
    if (!this.courses.includes(course)) {
        this.courses.push(course);
        this.grades[course] = [];
        this.attendance[course] = [];
    }
};

Student.prototype.removeCourse = function (course) {
    const index = this.courses.indexOf(course);
    if (index > -1) {
        this.courses.splice(index, 1);
        delete this.grades[course];
        delete this.attendance[course];
    }
};

Student.prototype.getInfo = function () {
    const courseDetails = this.courses.map(course => {
        return {
            course: course,
            averageGrade: this.getAverageGrade(course),
            averageAttendance: this.getAverageAttendance(course)
        };
    });

    const totalAverageGrade = this.courses.length > 0
        ? this.getAverage(this.courses.map(course => this.getAverageGrade(course)))
        : 0;

    const totalAverageAttendance = this.courses.length > 0
        ? this.getAverage(this.courses.map(course => this.getAverageAttendance(course)))
        : 0;

    return {
        Name: this.name,
        Surname: this.surname,
        BirthYear: this.birthYear,
        Courses: this.courses,
        CourseDetails: courseDetails,
        TotalAverageGrade: totalAverageGrade.toFixed(2),
        TotalAverageAttendance: totalAverageAttendance.toFixed(2)
    };
};

function Group(name) {
    this.name = name;
    this.students = [];
}

Group.prototype.addStudent = function (student) {
    this.students.push(student);
};

Group.prototype.removeStudent = function (student) {
    const index = this.students.indexOf(student);
    if (index > -1) {
        this.students.splice(index, 1);
    }
};

Group.prototype.getPerformanceRating = function () {
    return this.students.map(student => {
        const averageGrades = student.courses.map(course => student.getAverageGrade(course));
        const totalAverage = student.getAverage(averageGrades);
        return {
            student: student,
            averageGrade: totalAverage
        };
    }).sort((a, b) => b.averageGrade - a.averageGrade);
};

Group.prototype.getAttendanceRating = function () {
    return this.students.map(student => {
        const averageAttendances = student.courses.map(course => student.getAverageAttendance(course));
        const totalAverage = student.getAverage(averageAttendances);
        return {
            student: student,
            averageAttendance: totalAverage
        };
    }).sort((a, b) => b.averageAttendance - a.averageAttendance);
};

Group.prototype.getGroupName = function () {
    return this.name;
};

// Testing with students Svetlana and Ivan
var svetlana = new Student("Svetlana", "Sveta", 2000);
var ivan = new Student("Ivan", "Ivan", 1999);

svetlana.addCourse("Mathematics");
svetlana.addCourse("Physics");
ivan.addCourse("Literature");
ivan.addCourse("History");

svetlana.addGrade("Mathematics", 4);
svetlana.addGrade("Mathematics", 5);
svetlana.addGrade("Physics", 3);
svetlana.addGrade("Physics", 4);

ivan.addGrade("Literature", 5);
ivan.addGrade("Literature", 5);
ivan.addGrade("History", 4);
ivan.addGrade("History", 3);

svetlana.addAttendance("Mathematics", 1);
svetlana.addAttendance("Mathematics", 1);
svetlana.addAttendance("Physics", 1);
svetlana.addAttendance("Physics", 0);

ivan.addAttendance("Literature", 1);
ivan.addAttendance("Literature", 0);
ivan.addAttendance("History", 1);
ivan.addAttendance("History", 1);

// Creating the group and adding students
var group = new Group("Computer Science 101");
group.addStudent(svetlana);
group.addStudent(ivan);

// Displaying the group name using getGroupName
console.log("Group Name:", group.getGroupName());

// Displaying student information
console.log("Svetlana's Information:", svetlana.getInfo());
console.log("Ivan's Information:", ivan.getInfo());

// Displaying performance and attendance ratings for the group
console.log("Performance Rating in " + group.getGroupName() + ":");
group.getPerformanceRating().forEach(rating => {
    console.log(`Student: ${rating.student.name} ${rating.student.surname}, Average Grade: ${rating.averageGrade.toFixed(2)}`);
});

console.log("Attendance Rating in " + group.getGroupName() + ":");
group.getAttendanceRating().forEach(rating => {
    console.log(`Student: ${rating.student.name} ${rating.student.surname}, Average Attendance: ${rating.averageAttendance.toFixed(2)}`);
});
