const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API');

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/emp',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totemp',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totdep',async(req,res)=>{
    try{
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totlocations',async(req,res)=>{
    try{
        const result = await pool.query('select count(location_id) from locations');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totreg',async(req,res)=>{
    try{
        const result = await pool.query('select count(region_id) from regions');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totjob',async(req,res)=>{
    try{
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/Totcoun',async(req,res)=>{
    try{
        const result = await pool.query('select count(country_id) from countries');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connect Successfully...on PORT ${PORT}`);
});