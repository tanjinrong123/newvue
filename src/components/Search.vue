<template>
    <div class="search">
        <el-tabs type="border-card">
            <el-tab-pane label="联赛搜索">
                <el-col class="demo-autocomplete" :span="12">
                    <span>联赛名搜索</span>
                <el-autocomplete
                        class="inline-input"
                        v-model="state"
                        :fetch-suggestions="searchLeagues"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        clearable
                        @select="handleSelect"

                ></el-autocomplete>
                </el-col>
                <div class="content">
                    <el-table
                            :data="leaguesContent"
                            height="450"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="league_name"
                                label="联赛名"
                                width="100">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="league_logo"-->
                                <!--label="联赛logo"-->
                                <!--width="130">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="league_clubs"
                                label="俱乐部"
                                >
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="俱乐部搜索">
                <el-col class="demo-autocomplete">
                    <ul>
                        <li>
                            <span>俱乐部中文名</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state2"
                                    :fetch-suggestions="searchClubsbyclubname"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByclubs_name"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>俱乐部英文名</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state3"
                                    :fetch-suggestions="searchClubsbyclubuname"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByclubs_uname"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>俱乐部管理员</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state4"
                                    :fetch-suggestions="searchClubsbyclubmanager"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByclubs_manager"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>俱乐部球场</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state5"
                                    :fetch-suggestions="searchClubsbyclubsoccerfiled"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByclubs_soccerfield"
                            ></el-autocomplete>
                        </li>
                    </ul>

                </el-col>
                <div class="content">
                    <el-table
                            :data="clubsContent"
                            height="450"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="club_name"
                                label="俱乐部名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="club_uname"
                                label="俱乐部英文名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="league_name"
                                label="联赛名"
                                width="100">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="club_logo"-->
                                <!--label="俱乐部logo"-->
                                <!--width="130">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="club_manager"
                                label="俱乐部管理员"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="club_soccerfield"
                                label="俱乐部球场"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="club_players"
                                label="俱乐部球员"
                                >
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="球员搜索">
                <el-col class="demo-autocomplete">
                    <ul>
                        <li>
                            <span>球员中文名</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state6"
                                    :fetch-suggestions="searchClubsbyplayer_name"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_name"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员英文名</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state7"
                                    :fetch-suggestions="searchClubsbyplayer_uname"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_uname"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员号码</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state8"
                                    :fetch-suggestions="searchClubsbyplayer_number"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_number"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员位置</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state9"
                                    :fetch-suggestions="searchClubsbyplayer_position"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_position"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员国籍</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state10"
                                    :fetch-suggestions="searchClubsbyplayer_nation"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_nation"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员身高</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state11"
                                    :fetch-suggestions="searchClubsbyplayer_high"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_high"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员体重</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state12"
                                    :fetch-suggestions="searchClubsbyplayer_weight"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_weight"
                            ></el-autocomplete>
                        </li> <li>
                            <span>球员年龄</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state13"
                                    :fetch-suggestions="searchClubsbyplayer_age"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_age"
                            ></el-autocomplete>
                        </li>
                        <li>
                            <span>球员薪资</span>
                            <el-autocomplete
                                    class="inline-input"
                                    v-model="state14"
                                    :fetch-suggestions="searchClubsbyplayer_networth"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-search"
                                    clearable
                                    size="small"
                                    @select="handleSelectByplayer_networth"
                            ></el-autocomplete>
                        </li>
                    </ul>

                </el-col>
                <div class="content">
                    <el-table
                            :data="playersContent"
                            height="450"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="player_name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="player_uname"
                                label="英文姓名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="player_photo"
                                label="照片"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="player_age"
                                label="年龄"
                                width="70"
                                sortable>
                        </el-table-column>
                        <el-table-column
                                prop="player_high"
                                label="身高"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="player_weight"
                                label="体重"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="player_nationality"
                                label="国家"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="club_name"
                                label="俱乐部">
                        </el-table-column>
                        <el-table-column
                                prop="league_name"
                                label="联赛"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="player_position"
                                label="位置"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="player_networth"
                                label="薪资"
                                sortable>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    name: '',
    data(){
      return{
        raw:'',
        leagues:[],
        leaguesContent:[],
        clubsContent:[],
        clubs:[],
        players:[],
        playersContent:[],
        state:'',
        state2:'',
        state3:'',
        state4:'',
        state5:'',
        state6:'',
        state7:'',
        state8:'',
        state9:'',
        state10:'',
        state11:'',
        state12:'',
        state13:'',
        state14:'',
      }
    },
    created(){   //页面初始化，调用方法，返回数据
      this.leagues=this.loadLeagues()
      this.clubs=this.loadClubs()
      this.players=this.loadPlayers()
    },
    // mounted(){
    //  console.log(this.$refs.con)
    // },
    methods:{
      // 联赛搜索显示的下拉菜单
      searchLeagues(queryString,cb){
        let leagues=this.leagues
        let results=queryString ? leagues.filter(this.createFilter(queryString)):leagues
        cb(results)
      },

      // 原本的clubs是数据库原始的数据。element组件要求显示的数据有value,所以根据不同的value来创建不同的搜索
      // 根据俱乐部名字搜索
      searchClubsbyclubname(queryString,cb){
        let clubs=this.clubs
        clubs.forEach((item)=>{
          item.value=item.club_name
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):clubs
        cb(results)
      },
      // 根据俱乐部英文名搜索
      searchClubsbyclubuname(queryString,cb){
        let clubs=this.clubs
        clubs.forEach((item)=>{
          item.value=item.club_uname
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):clubs
        cb(results)
      },
      // 根据俱乐部管理员搜索
      searchClubsbyclubmanager(queryString,cb){
        let clubs=this.clubs
        clubs.forEach((item)=>{
          item.value=item.club_manager
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):clubs
        cb(results)
      },
      // 根据俱乐部球场搜索
      searchClubsbyclubsoccerfiled(queryString,cb){
        let clubs=this.clubs
        clubs.forEach((item)=>{
          item.value=item.club_soccerfield
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):clubs
        cb(results)
      },

      //球员搜索页
      // 根据球员中文名搜索
      searchClubsbyplayer_name(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_name
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员英文名搜索
      searchClubsbyplayer_uname(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_uname
        })
        let results=queryString ? clubs.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员号码搜索
      searchClubsbyplayer_number(queryString,cb){
        let players=this.players
        let newplayers=Array.from(new Set(oldplayers))
        players.forEach((item)=>{
          item.value=item.player_number
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员位置搜索
      searchClubsbyplayer_position(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_position
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员国籍搜索
      searchClubsbyplayer_nation(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_nationality
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员身高搜索
      searchClubsbyplayer_high(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_high
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员体重搜索
      searchClubsbyplayer_weight(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_weight
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员年龄搜索
      searchClubsbyplayer_age(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_age
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },
      //根据球员薪资搜索
      searchClubsbyplayer_networth(queryString,cb){
        let players=this.players
        players.forEach((item)=>{
          item.value=item.player_networth
        })
        let results=queryString ? players.filter(this.createFilter(queryString)):players
        cb(results)
      },


      // 创建过滤器
      createFilter(queryString) {
        return (res) => {
          return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },

      // 发送请求，调用接口，获取联赛数据
      loadLeagues(){
        // return [
        //   { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        //   { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        //   { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" }
        //   ]
          this.$ajax.get('leagues')
            .then(res=>{
              let data=res.data.data
              // console.log(data)
              data.forEach((item)=>{
                item.value=item.league_name
              })
              this.leagues=data
              // console.log(this.leagues)
              return this.leagues
            })
            .catch(err=>{
              console.log(err)
            })

      },
      // 发送请求，调用接口，获取所有俱乐部的数据
      loadClubs(){
        this.$ajax.get('clubs')
          .then(res=>{
            let data=res.data.data
            this.clubs=data
            // console.log(this.clubs)
            return this.clubs
          })
          .catch(err=>{
            console.log(err)
          })

      },
      // 发送请求，调用接口，获取所有球员的数据
      loadPlayers(){
        this.$ajax.get('players')
          .then(res=>{
            let data=res.data.data
            this.players=data
            // console.log(this.players)
            return this.players
          })
          .catch(err=>{
            console.log(err)
          })
      },

      //当选择某个联赛时，将中国联赛的数据从leagues拿出来追加到leaguesContent，并显示在table
      handleSelect(item) {
        let name=item.value;
        console.log(name)
        let arr=[]
          this.leagues.forEach((item)=>{
          if(item.league_name==name){
            arr.push(item)
          }
        })
        this.leaguesContent=arr
      },
      //当估计俱乐部中文名选择时，将其数据从clubs拿出来追加到clubsContent，并显示在table
      handleSelectByclubs_name(item) {
        let name=item.value;
        let arr=[]
        this.clubs.forEach((item)=>{
          if(item.club_name==name){
            arr.push(item)
          }
        })
        this.clubsContent=arr
      },
      handleSelectByclubs_uname(item) {
        let name=item.value;
        let arr=[]
        this.clubs.forEach((item)=>{
          if(item.club_uname==name){
            arr.push(item)
          }
        })
        this.clubsContent=arr
      },
      handleSelectByclubs_manager(item) {
        let name=item.value;
        let arr=[]
        this.clubs.forEach((item)=>{
          if(item.club_manager==name){
            arr.push(item)
          }
        })
        this.clubsContent=arr
      },
      handleSelectByclubs_soccerfield(item) {
        let name=item.value;
        let arr=[]
        this.clubs.forEach((item)=>{
          if(item.club_soccerfield==name){
            arr.push(item)
          }
        })
        this.clubsContent=arr
      },
    },

  }
</script>

<style scoped lang="scss">
.search{
    padding: 50px;
    .demo-autocomplete{
        margin: 20px auto;
        li{
            float: left;
            padding: 10px 20px;
            span{
                padding-right:10px;
            }
        }

    }
.content{
    height: 500px;
    text-align:center;
    .el_table{
        text-align: center;

    }
}
}
</style>
<style>
    .content .el-table__body tr{
        /*max-height: 130px;*/
    }
    .content th{
        text-align: center;
    }
</style>

