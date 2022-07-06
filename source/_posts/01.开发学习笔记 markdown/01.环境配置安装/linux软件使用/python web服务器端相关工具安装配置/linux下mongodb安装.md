---
title: linux下mongodb安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
  - mongodb
date:
---

    apt-get install mongodb

    service mongodb start

    service mongodb stop


    show dbs

    show collections 

    show users

    use db_name

    exit


python pymongo调用:
1.安装pyMongo包 MongoDB
2.连接
~# 无密码连接

    import pymongo
    mongo_client = pymongo.MongoClient('127.0.0.1', 27017)

~# 有密码连接

    import pymongo
    mongo_client = pymongo.MongoClient('127.0.0.1', 26666)
    mongo_auth = mongo_client.admin
    mongo_auth.authenticate('用户名', '密码')

    print(mongo_client.server_info()) ~# 判断是否连接成功
    

3.获取Database 和 Collection
若没有Database 和Collection，则会自动创建

第一种方式：

    mongo_db = mongo_client['你的database']
    mongo_collection = mongo_db['你的collection']

第二种方式:

    mongo_db = mongo_client.你的database
    mongo_collection = mongo_db.你的collection


CURD操作
4.插入单条数据 ` insert_one() ` 

    import datetime
    info = {
        'name' : 'Zarten',
        'text' : 'Inserting a Document',
        'tags' : ['a', 'b', 'c'],
        'date' : datetime.datetime.now()
    }
    mongo_collection.insert_one(info)


5.插入多条数据 ` insert_many() ` 

    import datetime
    info_1 = {
        'name' : 'Zarten_1',
        'text' : 'Inserting a Document',
        'tags' : ['a', 'b', 'c'],
        'date' : datetime.datetime.now()
    }

    info_2 = {
        'name' : 'Zarten_2',
        'text' : 'Inserting a Document',
        'tags' : [1, 2, 3],
        'date' : datetime.datetime.now()
    }

    insert_list = [info_1, info_2]
    mongo_collection.insert_many(insert_list)


6.插入字符串类型的时间
由上图可以看到插入字符串时间时，mongodb自动转成了 ISOdate类型，
若需要时间在mongdb也是字符串类型，只需这样操作即可

    datetime.datetime.now().isoformat()


7.删除一条数据 ` delete_one() `
删除一条数据。若删除条件相同匹配到多条数据，默认删除第一条

    mongo_collection.delete_one({'text' : 'a'})


8.删除多条数据 ` delete_many() `

删除满足条件的所有数据

    mongo_collection.delete_many({'text' : 'a'})


9.更新单条数据 ` update_one() `

只会更新满足条件的第一条数据

    update_one(filter,update,upsert=False,bypass_document_validation=False,collation=None,array_filters=None,session=None)

第一个参数 ` filter `：更新的条件
第二个参数 ` update `： 更新的内容，必须用$操作符
第三个参数 ` upsert `： 默认False。若为True，更新条件没找到，则插入更新的内容

    info = {
        'name': '桃子 ',
        'text': 'peach',
        'tags': [1, 2, 3],
        'date': datetime.datetime.now()

    }
    update_condition = {'name' : 'Zarten_2'} ~#更新的条件，也可以为多个条件
    ~#更新条件多个时，需要同时满足时才会更新
    ~# update_condition = {'name' : 'Pear',
    ~#                     'text' : '梨子'}

    mongo_collection.update_one(update_condition, {'$set' : info})


10.更新多条数据  ` update_many() ` 

更新满足条件的所有数据

    info = {
        'name': 'Zarten',
        'text': 'a',
        'tags': [1, 2, 3],
        'date': datetime.datetime.now()

    }
    update_condition = {'text' : 'a'} ~#更新的条件
    ~#更新条件多个时，需要同时满足时才会更新
    ~# update_condition = {'name' : 'Pear',
    ~#                     'text' : '梨子'}

    mongo_collection.update_many(update_condition, {'$set' : info})


11.更新时，若无满足条件，则插入数据
` update_one() `
通过设置upsert为True即可

    info = {
        'name': 'Banana',
        'text': '香蕉',
        'tags': [1, 2, 3],
        'date': datetime.datetime.now()
    }
    update_condition = {'text' : 'a'} ~#更新的条件
    ~#更新条件多个时，需要同时满足时才会更新
    ~# update_condition = {'name' : 'Pear',
    ~#                     'text' : '梨子'}

    mongo_collection.update_many(update_condition, {'$set' : info}, upsert= True)


12.查询一条数据 
 ` find_one() `
匹配第一条满足的条件的结果，这条结果以dict字典形式返回，若没有查询到，则返回None

    find_condition = {
        'name' : 'Banana',
        'text' : 'peach'
    }
    find_result = mongo_collection.find_one(find_condition)

可以通过projection参数来指定需要查询的字段，包括是否显示 _id ，
更多具体用法参考 ` find() `

    find_condition = {
        'name' : 'Zarten_3',
    }
    select_item = mongo_collection.find_one(find_condition, projection= {'_id':False, 'name':True, 'num':True})
    print(select_item)

13.查询范围
范围查询通常用$ 例如：$gte 大于等于 $lt 小于；具体的$符号在文章末尾查看
例如：查询一段时间内的数据

    import datetime
    find_condition = {
        'date' : {'$gte':datetime.datetime(2018,12,1), '$lt':datetime.datetime(2018,12,3)}
    }
    select_item = mongo_collection.find_one(find_condition)
    print(select_item)

14.查询多条数据 ` find() `
返回满足条件的所有结果，返回类型为 Cursor ，通过迭代获取每个查询结果，每个结果类型为dict字典
   
    find_condition = {
        'name' : 'Banana',
        'text' : '香蕉'
    }
    find_result_cursor = mongo_collection.find(find_condition)
    for find_result in find_result_cursor:
        print(find_result)


15.通过 _id 来查询
查询条件中_id 类型是ObjectId类型，也就是插入时返回的对象。
若 _id 提供的是str类型的，我们需要转成ObjectId类型

    from bson.objectid import ObjectId
    query_id_str = '5c00f60b20b531196c02d657'
    find_condition = {
        '_id' : ObjectId(query_id_str),
    }
    find_result = mongo_collection.find_one(find_condition)
    print(find_result)

16.查询一条数据同时删除 
    find_one_and_delete()
    find_one_and_delete(filter,projection=None,sort=None,session=None,**kwargs) 详细说明

` filter `：查询条件
` projection `：选择返回和不返回的字段
` sort`：list类型，当查询匹配到多条数据时，根据某个条件排序，函数返回时返回第一条数据

只能返回一条数据
此函数的特别之处在于，它会返回被删除的信息，以字典dict形式返回


17.查询并删除，匹配单条数据

    find_condition = {
        'name' : 'Banana',
    }
    deleted_item = mongo_collection.find_one_and_delete(find_condition)
    print(deleted_item)


18.查询并删除，匹配多条数据，有选择的返回某条数据
通过sort参数

    find_condition = {
        'name' : 'Zarten_2',
    }
    deleted_item = mongo_collection.find_one_and_delete(find_condition, sort= [('num', pymongo.DESCENDING)])
    print(deleted_item)

19.计数

    count_documents() 

注意：此函数在3.7版本添加，以下的版本无法使用

    find_condition = {
        'name' : 'Zarten_1'
    }
    select_count = mongo_collection.count_documents(find_condition)
    print(select_count)


20.创建索引 ` create_index() `
插入数据时，已经有一个_id索引了，我们还可以自定义创建索引
参数 unique置为True时，创建一个唯一索引，索引字段插入相同值时会自动报错。默认为False，为False时可以插入相同值
    
    mongo_collection.create_index('name', unique= True)


21.获取索引信息
` list_indexes() ` 和 ` index_information() `

~# list_indexs = mongo_collection.list_indexes()
~# for index in list_indexs:
~#     print(index)

    index_info = mongo_collection.index_information()
    print(index_info)

22.删除索引 ` drop_index() ` 和 ` drop_indexes() ` 

需要使用索引的别名，没有则抛出错误

    del_index = mongo_collection.drop_index('name_1')
    print(del_index)


23.删除集合 ` drop() ` 
    
    mongo_collection.drop()  