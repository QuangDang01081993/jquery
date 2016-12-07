var pg = require('pg');
var config ={
  user: 'postgres',
  password:'123',
  host:'localhost',
  port:5432,
  database:'DBKhachHang',
  max:1000,
  idleTimeoutMillis: 1000
}
var pool = new pg.Pool(config);
function queryDB(sql,cb){
  pool.connect((err,client,done) =>{
    if(err){
      return console.log('loi ket noi')
    }
    done();
    client.query(sql,cb);
  });
}
function getGirl(id,cb) {
  queryDB(`SELECT * FROM "Girls" where id=${id}`,(err,result) =>{
    cb(result.rows[0]);
  });
}
/* with rows AS()
   UPDATE "Girls" SET nlike = nlike +1 WHERE id > 5 returning *
 )
 SELECT * FROM rows
 */
function likeGirl(id,cb){
  queryDB(`
      WITH rows AS
      (
        UPDATE "Girls" SET nlike = nlike + 1 WHERE id=${id} RETURNING *
      )
      SELECT * FROM rows`,(err,result)=>{
        cb(result.rows[0].nlike);
      })
}
module.exports = {getGirl,likeGirl};
