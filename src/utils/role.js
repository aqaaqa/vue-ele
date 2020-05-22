export function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

export function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(localStorage.getItem(name));

}

export function removeObjArr(name) { //localStorage 获取数组对象的方法
  localStorage.removeItem(name)
}

//session
export function saveSession(name, data) { //localStorage 存储数组对象的方法
  sessionStorage.setItem(name, JSON.stringify(data))
}

export function getSession(name) { //localStorage 获取数组对象的方法
  return JSON.parse(sessionStorage.getItem(name));
}

export function removeSession(name) { //localStorage 获取数组对象的方法
  sessionStorage.removeItem(name)
}
