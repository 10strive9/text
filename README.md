# 贪吃蛇实现（难度可调节） 
在实现过程中需要考虑的一些问题以及解决方式以及游戏的可扩展性  
[效果展示,空格键(开始/暂停)](https://htmlpreview.github.io/?https://github.com/L-WJ1995/Snake/blob/master/%E8%B4%AA%E5%90%83%E8%9B%87.html)  
1. Snake的移动方式  
   移动方向的判定,在移动过程中,只响应移动方向的left和right,需要注意的是,Snake的长度为1时,此时可以响应所有方向。
   * 移动过程中需要注意一个问题,按键的响应间隔,如果不加以限制,则会出现极短时间相反方向按键生效的问题。本例通过设置一个全局变量,执行完一次移动该变量值为ture,执行过程中为false,通过这个值的真假来决定是否响应按键。  
2. 地图食物随机生成
   通过random函数实现随机生成,需要注意的就是生成的食物坐标需要在地图内(不含地图边线),同时不能在Snake的身体上。
3. 移动中的Snake身体构建和食物
   * 身体的构建,本例通过数组的形式储存Snake的每一个部分,再执行完一次移动后,数组自后向前遍历,后一个部分的坐标赋值前一个部分的坐标，Snake_head的坐标则根据方向重新计算。  
   * 如果移动过程吃到了食物,则Snake的坐标即食物坐标,数组末尾再添加一个原数组的最后一项坐标,同时再次随机生成食物。
4. 各个游戏结束机制判断
   游戏结束机制有二, Snake_head吃到蛇身/碰撞边界
   * Snake_head吃到蛇身,本例采用移动完成后加一次判断,如果Snake_head的坐标在身体部分的坐标集合中已经存在,即可判定Snake_head吃到蛇身,“！！！游戏结束！！！”。
   * 碰撞边界,同样通过Snake_head的坐标判定
5. 游戏暂停以及重开
6. 流畅性问题
   移动的流畅性,暂时想到可以通过requestAnimationFrame实现帧动画
7. 游戏扩展
   * 自定义是否可以碰撞边界
   * 地图障碍物生成
   * 移动过程中同方向的按键响应,加快移动速度
