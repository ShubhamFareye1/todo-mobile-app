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
    // deleteRealmIfMigrationNeeded:() => true,
})

const idGenerator = realm => {
    let id = realm.objects('todo1').max('id');
    console.log(id);
    if (!id) id = 0;
    return id + 1;
  };


  export function deleteAllvalue(){
    realm.write(() => {
        // Delete all objects from the realm.
        console.log('delete');
        realm.deleteAll();
      });
    }

export async function saveObject(table,object){
    console.log('new item added--------------------------------------------------------------',object);
    const realm = await Realm.open({
        path: 'RealmDB',
        schema: [TodoSchema],
      });
     console.log('object data',object);
    try{
    object.id=idGenerator(realm);
    if(Array.isArray(object)){
        realm.write(()=>object.forEach(data =>realm.write(table,data,true)));
    }
    else{
        realm.write(()=>realm.create(table,object,true));
    }
   } catch(err){
    console.log(err);
   }
}

export function deleteObject(object){
    console.log('delete is called' , object);
    if(Array.isArray(object)){
        realm.write(()=>object.forEach(forEach(realmObj => realm.delete(realmObj))));
    }else{
        realm.write(()=>realm.delete(object));
    }
}

export async function getTodosByStatus(filter) {
    const realm = await Realm.open({
      path: 'RealmDB',
      schema: [TodoSchema],
    });
    const data = realm.objects('todo1').filtered(`status=='${filter}'`);
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
    // if(query){
    //     results=results.filtereded(query);
    // }
    // if(sortBy){
    //     results=results.sorted(sortBy);
    // }
    console.log('results',results);
    return results;
    
}


export default Realm