// (async() => {
//     const url = "https://jsonplaceholder.typicode.com/todos";
//     const todos = await axios.get(url);
//     const length = todos.data.length;
//     console.log(todos.data);
//     console.log(length);
// })()

// import got  from "got";

// (async () => {
//     const url = "https://jsonplaceholder.typicode.com/todos";
//     const todos = await got(url);
//     console.log(todos.body);
// }
// )()

// const axios = require("axios");
// (async () => {

//     const url = "http://localhost:4545/students";
    
//   const payload = {
//     firstName: "Richei",
//     email: "agbakoder@g.com",
//     lastName: "Richeie",
//     departmentId: 1,
//   };

//   const students = await axios.post(url, payload);
//   console.log(students.data);
// })();


    // $(".featured").each((index, el) => {
    //     const link = $(el).find("a");
    //     const text = link.text();
    //     const href = link.attr("href");
    //     console.log(`Link: ${href}`);

    //     result.push({
    //         text,
    //         href
    //     });

    //    console.log(result);