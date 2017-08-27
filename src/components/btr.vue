<template>
  <div>
  <div style="color:red">
   对下列问题的回答，可能在不同程度上描绘了您的行为。每题有十句话，请将10分分配给这10个句子中的4句或更少。分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况也可能是十分全部分配给其中的某一句话。请根据您的实际情况打分。
   </div>
    <el-table
      height="620"
      stripe border
      :data="tableData"
      style="width: 100%">
    <el-table-column
      type="index"
      width="80">
    </el-table-column>
      <el-table-column
        prop="desc"
        label="试题">
      </el-table-column>
      <el-table-column
        label="倾向选择"
        width="500">     
        <template scope="scope">
          <div v-if="(scope.row.a==1)">
{{
tableData[scope.$index+1].vab+
tableData[scope.$index+2].vab+
tableData[scope.$index+3].vab+
tableData[scope.$index+4].vab+
tableData[scope.$index+5].vab+
tableData[scope.$index+6].vab+
tableData[scope.$index+7].vab+
tableData[scope.$index+8].vab+
tableData[scope.$index+9].vab+
tableData[scope.$index+10].vab
}}
<el-button @click.native="tableData[scope.$index+1].vab=
tableData[scope.$index+2].vab=
tableData[scope.$index+3].vab=
tableData[scope.$index+4].vab=
tableData[scope.$index+5].vab=
tableData[scope.$index+6].vab=
tableData[scope.$index+7].vab=
tableData[scope.$index+8].vab=
tableData[scope.$index+9].vab=
tableData[scope.$index+10].vab=0">重置</el-button>
<el-tag type="success" v-if="tableData[scope.$index+1].vab+
tableData[scope.$index+2].vab+
tableData[scope.$index+3].vab+
tableData[scope.$index+4].vab+
tableData[scope.$index+5].vab+
tableData[scope.$index+6].vab+
tableData[scope.$index+7].vab+
tableData[scope.$index+8].vab+
tableData[scope.$index+9].vab+
tableData[scope.$index+10].vab==10">OK</el-tag>
          </div>
          <el-rate v-if="(scope.row.a==0)"
            v-model="scope.row.vab"            
            :max="10"
            text-color="#ff9900"
            text-template="{value}">
          </el-rate>

        </template>
      </el-table-column>
    </el-table>
    <br /> 
  <div class="float-footer">
    <el-button type="primary" style="margin-top: 12px;" :disabled="!ok" @click="next">下一步</el-button>
  </div>
  </div>
</template>

  <script>
  import ds from '@/data/btr'
    export default {
      data() {
        return {
          tableData: ds.dataTable,
          tableData2: ds.dataTable2,
        }
      },
      computed:{
        amt(){
          return this.tableData.reduce((p,v,i,arr)=>v.vab+p,0)
        },
        ok(){
          return this.amt==70
        },
      },
      methods: {
        postData() {
          this.$http.post(this.$token("btr"),this.$store.state.form)
          .then(r=> {
            if(r.data.result){
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.$router.push("/end") 
            } else{
              this.$notify({
                title: '提交失败',
                message: h('i', { style: 'color: teal'}, r.data.errmsg)
              });
            } 
          })
          .catch(e=> {
            console.log(e)
            this.$notify({
              title: '提交失败',
              message: h('i', { style: 'color: teal'}, e)
            })
          })
        },
        next() {
          this.calc()
          this.$store.state.form.data1=this.tableData.slice(1)
          this.$store.state.form.data2=this.tableData2
           this.$store.state.form.date2= this.$moment().format('YYYY-MM-DD HH:mm:ss');
          console.log(this.$store.state.form.date2);
          this.postData()
           // this.$router.push("/end")
          // if (this.$store.state.active++ > 3) this.$store.state.active = 0;
        },
        calc(){
          this.tableData2[1].amt=this.tableData[22-13].vab+this.tableData[26-13].vab+this.tableData[47-13].vab+this.tableData[54-13].vab+this.tableData[63-13].vab+this.tableData[81-13].vab+this.tableData[90-13].vab
          this.tableData2[3].amt=this.tableData[18-13].vab+this.tableData[27-13].vab+this.tableData[38-13].vab+this.tableData[59-13].vab+this.tableData[67-13].vab+this.tableData[78-13].vab+this.tableData[92-13].vab
          this.tableData2[5].amt=this.tableData[21-13].vab+this.tableData[32-13].vab+this.tableData[40-13].vab+this.tableData[52-13].vab+this.tableData[65-13].vab+this.tableData[82-13].vab+this.tableData[86-13].vab
          this.tableData2[7].amt=this.tableData[17-13].vab+this.tableData[34-13].vab+this.tableData[41-13].vab+this.tableData[55-13].vab+this.tableData[69-13].vab+this.tableData[76-13].vab+this.tableData[91-13].vab
          this.tableData2[9].amt=this.tableData[14-13].vab+this.tableData[29-13].vab+this.tableData[44-13].vab+this.tableData[57-13].vab+this.tableData[66-13].vab+this.tableData[83-13].vab+this.tableData[89-13].vab
          this.tableData2[11].amt=this.tableData[23-13].vab+this.tableData[31-13].vab+this.tableData[46-13].vab+this.tableData[53-13].vab+this.tableData[62-13].vab+this.tableData[80-13].vab+this.tableData[87-13].vab
          this.tableData2[13].amt=this.tableData[16-13].vab+this.tableData[33-13].vab+this.tableData[42-13].vab+this.tableData[50-13].vab+this.tableData[64-13].vab+this.tableData[77-13].vab+this.tableData[95-13].vab
          this.tableData2[15].amt=this.tableData[19-13].vab+this.tableData[35-13].vab+this.tableData[39-13].vab+this.tableData[56-13].vab+this.tableData[68-13].vab+this.tableData[88-13].vab+this.tableData[79-13].vab
          this.tableData2[17].amt=this.tableData[20-13].vab+this.tableData[28-13].vab+this.tableData[45-13].vab+this.tableData[51-13].vab+this.tableData[70-13].vab+this.tableData[75-13].vab+this.tableData[94-13].vab
          this.tableData2[19].amt=this.tableData[15-13].vab+this.tableData[30-13].vab+this.tableData[43-13].vab+this.tableData[58-13].vab+this.tableData[71-13].vab+this.tableData[74-13].vab+this.tableData[93-13].vab
        }
      },
      activated(){
        this.$store.state.active=5
      }
    }
  </script>