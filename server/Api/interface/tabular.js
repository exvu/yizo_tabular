/// <reference path="../../typings/globals/yizo/index.d.ts" />
//@ts-check
let TabularController = require("../controller/tabular");
let { Interface, Route, Validate } = yizo;
/**signin
 * 创建接口解析函数 将对应的接口解析到对应的controller的对应方法
 * 默认需要token
 */
Interface.create('/tabular', TabularController, [
  /**
   * 获取表单列表
   */
  Route('/', 'get', 'list', {
    verify: {
      page: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      pageSize: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      needPage: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      creater: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 获取指定表单信息
   */
  Route("/:id",'get',"info",{
    verify:{
    },
    needToken: false
  }),
  /**
   * 添加
   */
  Route('/', 'post', 'add', {
    verify: {
      title: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [

        ]
      },
      endTime: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 修改表单信息
   */
  Route('/:id', 'put', 'update', {
    verify: {
      title: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
        ]
      },
      status: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  /**
   * 删除表单
   */
  Route('/', 'delete', 'delete', {
    verify: {
      ids: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
  Route("/:id/item",'post','answer',{
    verify: {
      data: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:true
  }),
  Route("/:id/data",'get','data',{
    verify: {
      page: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      pageSize: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      needPage: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:true
  }),
  Route("/:id/excel",'get','excel',{
    needToken:false
  }),
  /**
   * 添加字段
   */
  Route('/:id/field', 'post', 'addField', {
    verify: {
      field_name: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      field_type: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      required: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },

      options: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
   /**
   * 字段排序
   */
  Route('/:id/field/sort','put','sortField',{
    verify:{
      field_id:{
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      type:{
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:false
  }),
  /**
   * 修改字段
   */
  Route('/(:tid)/field/(:fid)', 'put', 'updateField', {
    verify: {
      field_name: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      field_type: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      explanation: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      required: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      },
      options: {
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken: true
  }),
 
  /**
   * 删除字段
   */
  Route("/:tid/field",'delete','deleteField',{
    verify:{
      ids:{
        mode: Validate.MUST_VALIDATE,
        rule: [
          ['require', 'paramsNotNullErr']
        ]
      }
    },
    needToken:true
  })
])