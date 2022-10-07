/* 
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'
// webpack默认对外暴露的文件：图片，json数据格式
// 提供广告位轮播数据的接口
Mock.mock('/mock/banners',{
    //成功返回200
    code: 200,
    data: banners
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})
