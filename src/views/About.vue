<template>
  <div>
    <p>yan.xu@partner.bmw-brilliance.cn,zhi.zhou.ba@partner.bmw-brilliance.cn</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Activity form" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc" :row="40" :col="20"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
<More></More>
  </div>
</template>
<script>
  const checkEmail = (rule, value, callback, _this) => {
    const mailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
    if (!value) return callback(new Error('请输入邮箱'))
    let vals = value.trim().replace(/\s+/g, '')
    if (vals.indexOf(',') > 0) {
      const state = vals.split(',').every(cur => mailReg.test(cur))
      if (!state) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }else{
      if (mailReg.test(vals)) {
         callback()
      } else {
        callback(new Error('格式错误'))
        // callback(new Error(_this.$t('emailErr'))) // i18n 用法
      }
    }
  }
  import More from '@/components/more'
  export default {
    data() {
      return {
        ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            { required: true, 
              trigger: 'blur',
              validator: (rule, value, callback) => {
                checkEmail(rule, value, callback, this)
              } 
            }
          ]
        }
      };
    },
    components: {More},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid, 798)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>