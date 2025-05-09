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

app.get('/emplocation',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, l.location_id, l.street_address, l.postal_code, c.country_id, c.country_name from employees e join departments d on e.department_id = d.department_id join locations l on d.location_id= l.location_id join countries c on c.country_id = l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});




app.get('/empjobhis',async(req,res)=>{
    try{
        const result= await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date from employees e join job_history jh on e.employee_id=jh.employee_id limit 5');

        res.json(result.rows);


    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/empjobhistory',async(req,res)=>{
    try{
        const result= await pool.query('select e.employee_id, e.first_name,e.last_name, jh.start_date, jh.end_date from employees e join job_history jh on e.employee_id=jh.employee_id limit 5');

        res.json(result.rows);


    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/deptjobhist',async(req,res)=>{
    try{
        const result= await pool.query('select e.employee_id, e.first_name,d.department_name,jh.start_date, jh.end_date from employees e join job_history jh on e.employee_id=jh.employee_id join departments d on e.department_id=d.department_id limit 5');

        res.json(result.rows);


    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobdeptloca',async(req,res)=>{
    try{
        const result= await pool.query('select e.employee_id, e.first_name,jh.start_date, jh.end_date, d.department_id, d.department_id,l.location_id,l.street_address, l.postal_code from employees e join job_history jh on e.employee_id=jh.employee_id join departments d  on e.department_id=d.department_id join locations l on d.location_id=l.location_id limit 5');

        res.json(result.rows);


    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/empjobhiscoun',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date,c.country_id, c.country_name from employees e join job_history jh on e.employee_id=jh.employee_id join departments d on jh.department_id = d.department_id join locations l on d.location_id= l.location_id join countries c on c.country_id = l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/jobhisempldep',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date, d.department_id,d.department_name from employees e join job_history jh on e.employee_id=jh.employee_id join departments d on jh.department_id = d.department_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/jobhisemp',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date, j.job_id,j.job_title from employees e join job_history jh on e.employee_id=jh.employee_id join jobs j on j.job_id = jh.job_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/jobhisempldep',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date, j.job_id,j.job_title,d.department_id,d.department_name from employees e join job_history jh on e.employee_id=jh.employee_id join jobs j on j.job_id = jh.job_id join departments d on jh.department_id=d.department_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/jobhisemplloca',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, jh.start_date, jh.end_date, j.job_id,j.job_title,l.location_id, l.street_address,l.postal_code from employees e join job_history jh on e.employee_id=jh.employee_id join jobs j on j.job_id = jh.job_id join departments d on e.department_id = d.department_id join locations l on d.location_id=l.location_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/jobhisemplcoun',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name,j.job_id,j.job_title,c.country_id,c.country_name,jh.start_date, jh.end_date from employees e join departments d on e.department_id=d.department_id join job_history jh on d.department_id=jh.department_id join jobs j on j.job_id=jh.job_id join locations l on d.location_id=l.location_id join countries c on c.country_id=l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no51',async(req,res)=>{
    try{
        const result = await pool.query('select r.region_id, r.region_name, c.country_id, c.country_name,l.location_id, l.street_address, l.postal_code from regions r join countries c on r.region_id=c.region_id join locations l on c.country_id= l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no52',async(req,res)=>{
    try{
        const result = await pool.query('select c.country_id, c.country_name, r.region_id, r.region_name,l.location_id, l.street_address, l.postal_code from regions r join countries c on r.region_id=c.region_id join locations l on c.country_id= l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no53',async(req,res)=>{
    try{
        const result = await pool.query('select l.location_id, l.street_address, l.postal_code,c.country_id, c.country_name, r.region_id, r.region_name from locations l join countries c on l.country_id=c.country_id join regions r on r.region_id=c.region_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no54',async(req,res)=>{
    try{
        const result = await pool.query('select d.department_id, d.department_name, e.employee_id, e.first_name, l.location_id, l.street_address, l.postal_code from departments d join employees e on d.department_id = e.department_id join locations l on d.location_id = l.location_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no55',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,d.department_id, d.department_name, l.location_id, l.street_address, l.postal_code, c.country_id,c.country_name from employees e join departments d on d.department_id = e.department_id join locations l on d.location_id = l.location_id join countries c on c.country_id = l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no56',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,m.first_name as "Manager_Name",d.department_id, d.department_name,l.location_id, l.street_address, l.postal_code from employees e join employees m on e.manager_id=m.manager_id join departments d on e.department_id= d.department_id join locations l on d.location_id = l.location_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no57',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,e.manager_id,j.job_id, j.job_title, d.department_id, d.department_name,l.location_id, l.street_address, l.postal_code from employees e join jobs j on e.job_id = j.job_id join departments d on d.department_id=e.department_id join locations l on d.location_id = l.location_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no58',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,j.job_id, j.job_title, d.department_id, d.department_name, m.manager_id as "Manager_name" from employees e join jobs j on e.job_id = j.job_id join departments d on d.department_id= e.department_id join employees m on e.manager_id= m.manager_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no59',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,j.job_id, j.job_title, d.department_id, d.department_name,m.first_name as "Manager_name",l.location_id, l.street_address, l.postal_code from employees e join jobs j on e.job_id = j.job_id join departments d on d.department_id = e.department_id join employees m on e.manager_id=m.manager_id join locations l on d.location_id = l.location_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no60',async(req,res)=>{
    try{
        const result = await pool.query('select c.country_name, c.country_id, r.region_id from countries c join regions r on c.region_id=r.region_id where r.region_id = 1 limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no61',async(req,res)=>{
    try{
        const result = await pool.query("select d.department_id, d.department_name, l.city from departments d join locations l on d.location_id= l.location_id where l.city like \'N%\' limit 5");
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no62',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, e.salary, e.commission_pct, d.department_id, d.manager_id from employees e join departments d on e.manager_id = d.manager_id where e.commission_pct > 0.15 limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no63',async(req,res)=>{
    try{
        const result = await pool.query('select e.manager_id, j.job_title from employees e join jobs j on e.job_id=j.job_id where manager_id is not null limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no64',async(req,res)=>{
    try{
        const result = await pool.query('select l.postal_code, r.region_name from locations l join countries c on l.country_id=c.country_id  join regions r on c.region_id= r.region_id where region_name =\'Asia\' limit 5 ');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no65',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.commission_pct, d.department_name from employees e join departments d on e.department_id=d.department_id where e.commission_pct < (select avg(commission_pct) from employees) limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no66',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.salary,j.job_id, j.job_title from employees e join jobs j on e.job_id=j.job_id where salary > (select avg(salary) from employees group by e.department_id) limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});
app.get('/no67',async(req,res)=>{
    try{
        const result = await pool.query('select employee_id, first_name, department_id from employees where department_id is null limit 5;');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no68',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name from employees e join job_history jh on e.employee_id=jh.employee_id group by e.employee_id having count(jh.job_id) >1;');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no69',async(req,res)=>{
    try{
        const result = await pool.query('select d.department_name, count(e.employee_id ) from employees e join departments d on e.department_id = d.department_id group by d.department_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no70',async(req,res)=>{
    try{
        const result = await pool.query('select j.job_title , sum(e.salary) from employees e join jobs j on e.job_id=j.job_id group by j.job_title limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no71',async(req,res)=>{
    try{
        const result = await pool.query('select d.department_name, avg(commission_pct) from employees e join departments d on e.department_id = d.department_id group by d.department_id');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no72',async(req,res)=>{
    try{
        const result = await pool.query('select max(e.salary),c.country_name from employees e join departments d on e.department_id = d.department_id join locations l on l.location_id=d.location_id join countries c on l.country_id = c.country_id group by c.country_name limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});

    }
});

app.get('/no72b',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name, e.last_name, d.department_name,l.city, l.state_province from employees e join departments d on e.department_id = d.department_id join locations l on l.location_id=d.location_id where e.first_name like \'%z%\' limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no73',async(req,res)=>{
    try{
        const result = await pool.query('select j.job_title, d.department_name, e.first_name, e.last_name, jh.start_date, jh.end_date from jobs j join employees e on j.job_id=e.job_id join departments d on e.department_id=d.department_id join job_history jh on jh.department_id = d.department_id where start_date >= \'1993-01-01 00:00:00\' and end_date <= \'1997-08-31 00:00:00\' limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no74',async(req,res)=>{
    try{
        const result = await pool.query('select c.country_name, l.city, d.department_id from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id join countries c on c.country_id=l.country_id group by d.department_id,c.country_name,l.city having count(e.employee_id) >2');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no75',async(req,res)=>{
    try{
        const result = await pool.query('select j.job_title, e.first_name, e.last_name,jh.start_date, jh.end_date from jobs j join employees e on j.job_id=e.job_id join job_history jh on jh.employee_id = e.employee_id where commission_pct is null limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no76',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name, e.last_name,c.country_id ,c.country_name from employees e join departments d on e.department_id = d.department_id join locations l on l.location_id = d.location_id join countries c on c.country_id = l.country_id limit 5');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no77',async(req,res)=>{
    try{
        const result = await pool.query('select first_name, last_name, salary, department_id from employees where salary in (select min(salary) from employees group by department_id)');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no78',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees where salary=(select max(salary) from employees where salary=(select max(salary) from employees where salary=(select max(salary) from employees)))');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no79',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id, e.first_name, e.last_name, e.salary from employees e join departments d on e.department_id = d.department_id where e.salary > (select avg(salary) from employees) and d.department_id in (select department_id from employees where first_name like \'%J%\' or last_name like \'%J%\' )');
        res.json(result.rows);

    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/no80',async(req,res)=>{
    try{
        const result= await pool.query('select e.employee_id, e.first_name, e.last_name ,j.job_title from employees e  join jobs j on e.job_id = j.job_id join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id where city like \'Toronto\' limit 5');
        res.json(result.rows);

    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});





const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connect Successfully...on PORT ${PORT}`);
});