<template>
  <Form
    class="form1"
    ref="formValidate"
    :model="formValidate"
    :rules="ruleValidate"
    :label-width="80"
    inline
  >
    <Row>
      <Col span="12">
        <FormItem label="Name" prop="name">
          <Input style="width:200px" v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="E-mail" prop="mail">
          <Input style="width:200px" v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="City" prop="city">
      <Select v-model="formValidate.city" placeholder="Select your city">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="Date">
      <Row>
        <Col span="11">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="2" style="text-align: center">-</Col>
        <Col span="11">
          <FormItem prop="time">
            <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="Gender" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">Male</Radio>
        <Radio label="female">Female</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="Hobby" prop="interest">
      <CheckboxGroup v-model="formValidate.interest">
        <Checkbox label="Eat"></Checkbox>
        <Checkbox label="Sleep"></Checkbox>
        <Checkbox label="Run"></Checkbox>
        <Checkbox label="Movie"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="Desc" prop="desc">
      <Input
        v-model="formValidate.desc"
        type="textarea"
        :autosize="{minRows: 2,maxRows: 5}"
        placeholder="Enter something..."
      ></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script src='./index.js'></script>
<style lang='less' src='./index.less' scoped />
