


 export class status {
    constructor(furry) {

    }
    initial(furry){
        this.furry = furry;
        this.statusData= {
            [this.TYPES[1]]: 0,
            [this.TYPES[2]]: 5,
            [this.TYPES[3]]: 5,
            [this.TYPES[4]]: 5,
            [this.TYPES[5]]: 5,
            [this.TYPES[6]]: 0,
            [this.TYPES.LIF]: 1,
            [this.TYPES.ADD]: [],
            [this.TYPES.EVT]: 0,
            [this.TYPES.LSE]:0
        };
                }
     TYPES = {
        1: "DAY", //  日期 DAY
        2: "CHA", // 颜值 charm  CHA
        3: "INT", // 智力 intelligence INT
        4: "RMB", // 财力 renminbi RMB
        5: "FAM", // 体质 FAME FAM
        6: "GAY", // 快乐 GAY GAY
        LIF: "LIF", // 生命 life LIFE
        ADD: "ADD", // 状态 ADDition Status ADD

        TLT: "TLT", // 天赋 talent TLT
        EVT: "EVT", // 事件 Event EVT
        TMS: "TMS", // 次数 times TMS
        LSE:"LSE",  //上次的事件
    };
    furry;
    statusData;

    Progress(document){
        this.statusData.DAY ++;
        var Event;
        if(this.statusData[this.TYPES.EVT] == 0)
        {
            console.log("随机选");
        Event = this.EventRandom();
        }
        else{
            console.log("分支选");
            Event = this.furry[this.statusData[this.TYPES.EVT] -1 ];
            this.statusData[this.TYPES.EVT] = 0;
        }
        var describe =Event.Event;
        if(this.EventQualified(Event) ==true)
        {   
            console.log("成功")
            if(this.isEmpty(Event.goodPrompt) == false)
            {
            describe = describe+"<br>"+Event.goodPrompt;

            }
            if(this.isEmpty(Event.goodBranch) == false)
            {
                var randnum = (Math.floor(Math.random()*Event.goodBranch.length));
                this.statusData[this.TYPES.EVT] = Event.goodBranch[randnum];//成功分支
            }
            this.statusChange(Event);
        }
        else//失败分支
        {
            console.log("失败")

            if(this.isEmpty(Event.badPrompt) == false)
            {
                describe = describe+"<br>"+Event.badPrompt;

            }
            if(this.isEmpty(Event.badBranch) == false)
            {
                var randnum = (Math.floor(Math.random()*Event.badBranch.length));

                this.statusData[this.TYPES.EVT] = Event.badBranch[randnum];
            }
        }


        var li ="<li><span>"+describe+"</span></li>";
        var adventure =document.getElementById('adventure');
        adventure.innerHTML =adventure.innerHTML+li;

        for(var i =2;i<=6;i++)
        {
            document.getElementById(this.TYPES[i]).innerHTML = this.statusData[this.TYPES[i]];
        }
        if(this.statusData["ADD"].length >0){
        document.getElementById("ADD").innerHTML =this.statusData["ADD"].join();}
        else{
            document.getElementById("ADD").innerHTML ="无";
        }

        adventure.scrollTop =adventure.scrollHeight;

    }

    statusChange(Events)//改变状态
    {
        var qualified = true;
        for(var i =2;i<=6;i++)
        {
            this.statusData[this.TYPES[i]] += Events[this.TYPES[i] +"change"];
        }
        this.statusData[this.TYPES.LSE] = Events.exclude;
        Events["ADDchange"].forEach(ADDchange=>{
            if(this.isEmpty(ADDchange) == false)
            {
                if(ADDchange.startsWith("-"))
                {
                    console.log(this.statusData[this.TYPES.ADD]);
                    console.log(ADDchange);
                    var replaced =ADDchange.replace("-","");
                    var n =this.statusData[this.TYPES.ADD].indexOf(replaced);
                    if(n != -1){
                        this.statusData[this.TYPES.ADD].splice(n,1);}
                }
                else if(this.statusData[this.TYPES.ADD].includes(ADDchange) == false)//不要重复添加
                {
                    this.statusData[this.TYPES.ADD].push(ADDchange);
                }
            }
        })


    }


    EventQualified(Event){//单个事件
        var qualified = true;
        for(var i =2;i<=6;i++)
        {
            qualified = this.attributeRandom(this.statusData[this.TYPES[i]],Event[this.TYPES[i]]);
            if(qualified == false)
            {
                return false;
            }
        }
        return true;
    }
    
    attributeRandom(state, require){//自身点数大于事件需求
        if(this.numisEmpty(require) == true)//无需求
        {
            return true;
        }
        var randRequire =Math.random()*require*2 -require;
        if(state >= randRequire)
        {
            return true;
        }
        else{
            return false;
        }
    }


    EventRandom(){

        var Events = this.furry.filter(this.checkValid,this);
        var randnum = (Math.floor(Math.random()*Events.length));
        console.log(Events);
        console.log(Events[randnum].Event);
        return Events[randnum];
    }
    
    checkValid(furry){


        if(this.isEmpty(furry.include) == true)//include为后置事件，不进入随机表
        {  
            if(this.isEmpty(furry.ADD) == true)//事件条件都为空则可以
            {
                if(this.statusData[this.TYPES.LSE] == 0)
                    {return true;}
                else{
                    return false;
                }
            }
            else{
                var state = true;
                furry.ADD.forEach(element => {//


                    if(element.startsWith("-") == true) //负号代表该条件不能出现
                    {
                        var replaced =element.replace("-","");
                        if(this.statusData.ADD.includes(replaced) == true)
                        {
                            state = false;
                        }
                    }
                    else if(this.statusData.ADD.includes(element) == false )
                    {
                        state = false;
                    }
                })
                return state;//True or false
            }
        }
    }

    isEmpty(RMBing){
        if(RMBing === undefined || RMBing.length == 0 || RMBing ==null )
        {
            return true;
        }
        else{
            return false;
        }

    }
    numisEmpty(num){
        if(num =="" || num == null || num === undefined || num == 0)//无需求
        {
            return true;
        }
        else{
            return false;
        }
    }
}


