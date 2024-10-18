import React, { MouseEventHandler, useState } from 'react'
import { useComponentConfigStore } from '../../stores/component-config'
import { Component, useComponentsStore } from '../../stores/components'

export function EditArea() {
  const { components } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number>()
  const handlerMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()
    for (let index = 0; index < path.length; index++) {
      const element = path[index] as HTMLElement
      console.log(element.dataset)

      const componentId = element.dataset?.componentId
      if (componentId) {
        setHoverComponentId(Number(componentId))
        return
      }
    }
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.component) {
        return null
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      )
    })
  }

  return (
    <div className="h-[100%]" onMouseOver={handlerMouseOver}>
      {hoverComponentId}
      {renderComponents(components)}
    </div>
  )
}

/**
 *
 *
 * 一面
 *  先聊项目
 *  事件循环
 *  谈谈对性能优化的理解，怎么做
 *  浏览器输入url的过程
 *  手写：Promise.all
 *  手写：react实现一个Select组件
 * 二面
 *  先聊项目
 *  ts泛型 装饰器
 *  组件的受控与非受控模式
 *  react合成事件
 *  fiber
 *  手写：antd评分组件
 * 三面
 *  先聊项目
 *  你怎么看react和vue
 *  性能优化
 *  浏览器输入url的过程
 *  你有没有觉得前端在整个开发流程中比较弱势，话语权低？
 *  怎么看工作压力
 *  有人pua你怎么办
 *  你怎么看待学历
 *  个人发展规划
 *  聊了聊个人情况
 * hr面
 *  聊薪资、离职原因、收集了一些薪资学历的证明
 */
