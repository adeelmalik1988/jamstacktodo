const faunadb = require("faunadb");
const dotenv = require("dotenv")
const q = faunadb.query;

(
    async () => {
        
        const envvar = dotenv.config()

        console.log(envvar)
        var client = new faunadb.Client({
            secret: process.env.FAUNA
        })
        try {

            // const results = await client.query(
            //     q.Create(
            //         q.Collection("todos"), {
            //             data: {
            //                 text: "new user todo",
            //                 done: false,
            //                 owner: "user-test-2",
            //             }}
            //         )
            //     )

            // const results =  await client.query(
            //     q.Paginate(q.Match(q.Index("todos_by_user"), "user-test" ))
            // )
            const results = await client.query(
                q.Update(q.Ref(q.Collection("todos"), "288794814185472525"),{
                    data: {
                        done: true
                    }
                }))
            



            console.log(results)
            console.log(results.data)

        } catch (err) {
            console.log(err)
        }

    }
)();

console.log("hello")