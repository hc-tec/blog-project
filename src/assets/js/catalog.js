
function getElement (el) {
  // 获取对应 Id 或 Class 的元素，注意，只能获取class 类元素中的第一个元素
  return document.getElementById(el) || document.getElementsByClassName(el)[0]
}

function h_elementList (parent) {
  const children = parent.children
  const h_ele_list = new Array()
  for (const el of children) {
    // 如果标签名为标题类型
    if (h_list.indexOf(el.localName) !== -1) {
      h_ele_list.push(el)
    }
  }
  return h_ele_list
}

function cmp (children, parent) {
  // 极层关系更小
  if (h_list.indexOf(children) > h_list.indexOf(parent)) { return -1 }
  // 极层关系相等
  else if (h_list.indexOf(children) === h_list.indexOf(parent)) { return 0 }
  // 极层关系更大
  else if (h_list.indexOf(children) < h_list.indexOf(parent)) { return 1 }
}

function catalog (parent_markup_name, row) {
  if (h_ele_list.length === 0) {
    return
  }
  // 弹出首元素
  const h_ele = h_ele_list.shift()
  // 比较此元素与上一个元素级数
  h_ele_markup_name = h_ele.localName
  // 如果小于上一个元素，则继续递归
  if (!this.cmp(h_ele_markup_name, parent_markup_name)) {
    key = `${h_ele_markup_name[1]}-${h_ele.innerHTML}`
    row[key] = {}
    this.catalog(h_ele_markup_name, row[key])
  } else {
    h_ele_list.unshift(h_ele)
    this.catalog(h_ele_markup_name, row)
  }
}

function formatKey (h_ele) {
  h_ele_markup_name = h_ele.localName
  return `${h_ele_markup_name[1]}-${h_ele.innerHTML}`
}

function toSameRow (index, h_ele_markup_name) {
  let flag = -1
  for (let i = index - 1; i >= 0; i--) {
    if (this.cmp(h_ele_markup_name, h_ele_list[i].localName) === -1) {
      flag = i
      break
    }
  }
  return flag
}

function initMakeCatalog (el) {
  const parent = this.getElement(el)
  var h_ele_list = this.h_elementList(parent)
  var h_prev_markup_name = 'h0'
  var row = catalog_tree
  // 保存每层字典
  var rowList = [row]
  for (const el of h_ele_list) {
    const h_ele_markup_name = el.localName
    // 如果小于上一个元素，则继续遍历
    cmp_value = this.cmp(h_ele_markup_name, h_prev_markup_name)
    if (cmp_value === -1) {
      const key = this.formatKey(el)
      row[key] = {}
      row = row[key]
      rowList.push(row)
    } else {
      const index = h_ele_list.indexOf(el)

      const sameRowIndex = this.toSameRow(index, h_ele_markup_name)

      if (sameRowIndex !== -1) {
        rowList[sameRowIndex + 1][this.formatKey(el)] = {}
        row = rowList[sameRowIndex + 1][this.formatKey(el)]
      } else {
        rowList[0][this.formatKey(el)] = {}

        row = rowList[0][this.formatKey(el)]
      }
    }
    h_prev_markup_name = h_ele_markup_name
  }
  console.log(catalog_tree)
}
