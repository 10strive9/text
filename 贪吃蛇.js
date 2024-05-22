
let game_status         //进程ID
let status = "off"      //开始/暂停
let game_over_val = 0   //游戏状态 1：进行中  0：ganmeover
let key_status = true   //按键状态

addEventListener("keydown",(e)=>{  //监听按键事件
  if (e.keyCode === 32) {
      game_mode()  //执行游戏状态
  }
  if(!key_status){
    return
  } 
  if (e.keyCode == 37  && game_over_val === 1) {
    if (coordinate_X.length === 1) {
      direction = "after"
    } else {  
      direction = direction === "before" ? "before" : "after"
    }
    key_status = false
    if (status === "on" ) dir.children[1].textContent = direction === "before" ? "\u2192" : "\u2190"
  } else if (e.keyCode == 38  && game_over_val === 1) {
      if (coordinate_X.length === 1) {
        direction = "up"
      } else {  
        direction = direction === "down" ? "down" : "up"
      }
      key_status = false
      if (status === "on") dir.children[1].textContent = direction === "down" ? "\u2193" : "\u2191"
  } else if (e.keyCode == 39  && game_over_val === 1) {
      if (coordinate_X.length === 1) {
        direction = "before"
      } else {  
        direction = direction === "after" ? "after" : "before"
      }
      key_status = false
      if (status === "on") dir.children[1].textContent = direction === "after" ? "\u2190" : "\u2192"
  } else if (e.keyCode == 40  && game_over_val === 1) {
      if (coordinate_X.length === 1) {
        direction = "down"
      } else {  
        direction = direction === "up" ? "up" : "down"
      }
      key_status = false
      if (status === "on") dir.children[1].textContent = direction === "up" ? "\u2191" : "\u2193"
  }
})

//执行游戏状态
function game_mode() {
  if (status === "off") {
    Start_game.style.visibility = "hidden"
    map.style.visibility = "visible"
    status = "on"
    if (game_over_val === 0) {
      init()  //初始化
      game_over_val = 1
    }                        
    if (!foodNode) append_food()                     //投放食物
    game_status = setInterval(move_direction, time)  //开始游戏
  } else {
      key_status = true
      Start_game.style.visibility = "visible"
      map.style.visibility = "hidden"
      status = "off"
      Start_game.children[0].textContent = "你离宝藏只有一步之遥哦"
      Start_game.children[0].dataset.text = "..."
      clearInterval(game_status)                    //暂停游戏
  }
}



let 
    direction,              //前进方向
    coordinate_X,
    coordinate_Y,
    temp_X,temp_Y,          //蛇身构造坐标(交换用)
    food_coordinate = [],   //食物坐标数组
    foodNode,               //食物节点
    time




function init(){  //初始化
  score.children[1].textContent = "0"     //得分
  dir.children[1].textContent = "\u2192" //前进方向文本
  time = diff.children[1].value - 0   //游戏难度(时间间隔)
  direction = "before"                //默认前进方向
  coordinate_X = [0]                  //snak的X坐标数组[0] snak_head坐标
  coordinate_Y = [320]                //snak的Y坐标数组[0] snak_head坐标
  Snak_head.style.top = coordinate_Y[0] - 0 + "px"
  Snak_head.style.left = coordinate_X[0] + 0 + "px"
  let node = map.children
  for (let i = node.length - 1; i >= 0; i--) {
    if (node[i].className === "Snak_body") map.removeChild(node[i])
  }
}


function move_direction(){  //移动以及移动过程中的事件判断
  let last_body_X = coordinate_X[coordinate_X.length - 1],
      last_body_Y = coordinate_Y[coordinate_Y.length - 1]
      temp_X = coordinate_X[0]
      temp_Y = coordinate_Y[0]
  if (direction === "up" && coordinate_Y[0] - 20 >= 0) {
    Snak_head.style.top = coordinate_Y[0] - 20 + "px"
    coordinate_Y[0] -= 20
  } else if (direction === "down" && coordinate_Y[0] + 20 <= 640) {
      Snak_head.style.top = coordinate_Y[0] + 20 + "px"
      coordinate_Y[0] += 20
  } else if (direction === "before" && coordinate_X[0] + 20 <= 640) {
      Snak_head.style.left = coordinate_X[0] + 20 + "px"
      coordinate_X[0] += 20
  } else if (direction === "after" && coordinate_X[0] - 20 >= 0) {
      Snak_head.style.left = coordinate_X[0] - 20 + "px"
      coordinate_X[0] -= 20
  } else {
     game_over()
     return
  }
  if (coordinate_X[0] === food_coordinate[0] && coordinate_Y[0] === food_coordinate[1]) {
    score.children[1].textContent = score.children[1].textContent - 0 + 1
    food_coordinate = []
    let Snak_body = document.createElement("div")
    Snak_body.className = "Snak_body"
    Snak_body.style.left = last_body_X + "px"
    Snak_body.style.top = last_body_Y + "px"
    map.appendChild(Snak_body)
    coordinate_X.push(last_body_X)
    coordinate_Y.push(last_body_Y)
    map.removeChild(foodNode)
    append_food()
  }
  key_status = true
  snake()
  if (!game_over_judge()) {
    game_over()
  }
}


function append_food(){ //添加食物
  foodNode = document.createElement("span")
  foodNode.className = "food_span"
  let count = 0, val
  while (count != 2) {
    val = parseInt(Math.round(Math.random() * 1000) / 20) * 20
    if (val > 640) continue
    if (coordinate_X.indexOf(val) === -1) {
      if (count === 0) {
        foodNode.style.left = val + "px"
      } else {
        foodNode.style.top = val + "px"
      }
      food_coordinate.push(val)
      count++
    }
  }
  map.appendChild(foodNode)
}

function snake(){     //重构蛇身
  let snak = map.getElementsByTagName("div")
  for (let i = snak.length - 1; i >= 1; i--) {
    if (i === 1) {
      snak[1].style.left = temp_X + "px"
      snak[1].style.top = temp_Y + "px"
      coordinate_X[1] = temp_X  
      coordinate_Y[1] = temp_Y
      break
    }
    snak[i].style.left = coordinate_X[i - 1] + "px"
    snak[i].style.top = coordinate_Y[i - 1] + "px"
    coordinate_X[i] = coordinate_X[i - 1]  
    coordinate_Y[i] = coordinate_Y[i - 1]
  }
}


function game_over_judge() {    //游戏结束判断
  let judge_X = coordinate_X.slice(1),judge_Y = coordinate_Y.slice(1)
  for (let i = 0; i < judge_X.length; i++) {
    if (judge_X[i] === coordinate_X[0]) {
      if (judge_Y[i] === coordinate_Y[0]) return false
    }
  }
  return true 
}

function game_over(){   //游戏结束
  Start_game.style.visibility = "visible"
  map.style.visibility = "hidden"
  status = "off"
  key_status = true
  game_over_val = 0
  Start_game.children[0].textContent = "恭喜发现宝藏8😊"
  Start_game.children[0].dataset.text = ""
  clearInterval(game_status)                 
}