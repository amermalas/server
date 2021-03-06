const express = require('express');
const examService = require('../services/examService');

const router = express.Router();

router.post('/', function(req, res, next) {
    console.log('On the service baby');
    const student = req.body.student;
    student.status = 'answered';
    student.enrollmentDate = new Date();
    
    console.log('insede the service 2');
    console.log(student);
    
    const sampleQuestionsPromise = examService.getNewExamQuestion();

    sampleQuestionsPromise.then(docs => {
        student.examQuestions = docs;        
        console.log(docs);
    }).then(() => {
        res.status(200).json(student);
    });
});

module.exports = router;

//method 1
//receive the request
//mark time and person
//pick 3 ramdon questions an save in the student
//redirect

//method2 - listener
//saves the monitorring Object
//check if user is doing the exam

//method3
//receive the submitions and save

/*
    status: string;
    enrollmentDate: Date;
    enrollmentForm: any;
    examQuestions: any[];
    monitoring: any[];
    snapshots:any[];
    grading: any[];
    resultsSent: boolean;
}*/

/*
Students {
    status (new, invited, answered,pass, fail)
    enrollment_data:
    enrollment_form: [name, address...]
    exam questions:[question_text, answer_text, answer_duration]
    monitoring: [start_time,end_time,out_of_window]
    exam_stapshots [{question_id, snap_text, frame_id}]
    grading:[{question_id, score}]
    results_sent: boolean
 }*/