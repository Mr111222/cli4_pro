<template>
  <div>
    <div>
       <el-select v-model="types" placeholder="choice template" @change="getTmp">
        <el-option label="one" value="1"></el-option>
        <el-option label="two" value="2"></el-option>
      </el-select>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Activity name" prop="name" v-show="types === '1'">
        <el-input v-model="ruleForm.name" style="width:50%"></el-input>
      </el-form-item>
    <el-form-item label="Activity zone" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        types: '',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            
          ],
          region: [
            { required: true, message: 'Please select Activity zone', trigger: 'change' }
          ]         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getTmp (val) {
        if (val === '1') {
          this.rules.name = { required: true, message: 'Please input Activity name', trigger: 'blur' }
        }else{
          this.rules.name = {}
        }
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>