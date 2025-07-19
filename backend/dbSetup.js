const db=require("./config/db");

const creatUserTable=`
    create table if not exists users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar(100) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL
    );
`;

const createTodoTable = `
    create table if not exists tasks(
        id int AUTO_INCREMENT primary key,
        task varchar(255) NOT NULL,
        isCompleted ENUM('pending','completed') DEFAULT 'pending',
        user_id INT NOT NULL,
        foreign key (user_id) references users(id) on delete cascade
    );
`;

db.query(creatUserTable,(err,result)=>{
    if(err){
        console.err("error creating users table:", err);
    }else{
        console.log("user table created successfully");
        db.query(createTodoTable,(err,result)=>{
            if(err){
                console.error("Error creating todo table",err.message);
            }else{
                console.log("Created todo table");
                db.end();
            }
        });
    }
});