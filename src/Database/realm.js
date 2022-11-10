import Realm from 'realm'
import { TodoSchema, UserSchema } from './Schema/TodoSchema';


const schema = [TodoSchema, UserSchema]


// let config = Realm.Configuration(
//     schemaVersion: 0,
//     deleteRealmIfMigrationNeeded: true
//   )
// Realm.Configuration.defaultConfiguration = config
  
//  //let realm = try! Realm()

const SCHEMA_VERSION=1;
let realm = new Realm({
    schemaVersion:SCHEMA_VERSION,
    schema: schema,
    shouldCompactOnLaunch:() => true,
})

// const realm = Realm.open({ schema: [TodoSchema], deleteRealmIfMigrationNeeded: true, })

const idGenerator = realm => {
    let id = realm.objects('todo').max('id');
    console.log(id);
    if (!id) id = 0;
    return id + 1;
  };


const idGeneratorUser = ({table,realm}) => {
    let id = realm.objects(table).max('id');
    console.log(id);
    if (!id) id = 0;
    return id + 1;
};  



export async function saveObject(table,object){
    console.log('new item added--------------------------------------------------------------',object);
    const realm = await Realm.open({
        path: 'RealmDB',
        schema: [TodoSchema],
    });
    try{
        object.id=idGenerator(realm);
        realm.write(()=>realm.create(table,object,true));
   } catch(err){
    console.log(err);
   }
}


export async function saveUserObject(table,object){
  console.log('new item added--------------------------------------------------------------',object);
  const realm = await Realm.open({
      path: 'RealmDB',
      schema: [UserSchema],
  });
  try{
      object.id=idGeneratorUser({table,realm});
      realm.write(()=>realm.create(table,object,true));
 } catch(err){
  console.log(err);
 }
}

export async function updateObject(todoId){
  const realm = await Realm.open({
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  realm.write(() => {
    const todoData = realm.objects('todo').filtered(`id=${todoId}`);
    todoData[0].status = "Done";
  });

}

export async function deleteObject(object){
  const realm = await Realm.open({
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  try{
    const obj=realm.objects('todo').filter(obj=>obj.id==object.id);
        await realm.write(async ()=>realm.delete(obj));
    
  }catch(e){console.log(e,'error')}
}

export async function getTodosByStatus(filter) {
    const realm = await Realm.open({
      path: 'RealmDB',
      schema: [TodoSchema],
    });
    const data = realm.objects('todo').filtered(`status=='${filter}'`);
    return data;
  }

export async function getRealmPath() {
    const realm = await Realm.open({
      path: 'RealmDB',
      schema: [TodoSchema],
    });
    return realm.path;
  }

export async function fetchObject(table){
    const realm = await Realm.open({
        path: 'RealmDB',
        schema: [TodoSchema],
      });
    console.log('fetch is vcalledf',table);
    let results = realm.objects(table);
    console.log('results',results);
    return results;
    
}


export default Realm

