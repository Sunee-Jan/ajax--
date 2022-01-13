//加载CSS
getCSS.onclick = function () {
  const request = new XMLHttpRequest();
  request.open("GET", "/style.css");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const style = document.createElement("style");
        style.innerHTML = request.response;
        console.log("1");
        document.body.appendChild(style);
      } else {
        alert("发生错误啦");
      }
    }
  };
  // onload无法根据状态码来分辨加载正确与否
  //   request.onload = function () {
  //     const style = document.createElement("style");
  //     style.innerHTML = request.response;
  //     console.log("1");
  //     document.body.appendChild(style);
  //   };
  request.send();
};

//加载JS
getJS.addEventListener("click", function () {
  const request = new XMLHttpRequest();
  request.open("GET", "/1.js");
  request.onreadystatechange = function () {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      console.log("1");
      const script = document.createElement("script");
      script.innerHTML = request.response;
      document.body.appendChild(script);
    }
  };
  request.send();
});

//加载HTML
getHTML.onclick = function () {
  const request = new XMLHttpRequest();
  request.open("GET", "/1.html");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status <= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      }
    }
  };
  request.send();
};

//加载XML
getXML.onclick = function () {
  const request = new XMLHttpRequest();
  request.open("GET", "/1.xml");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const dom = request.responseXML;
        console.log(dom);
        const message1 = dom.querySelector("message").textContent;
        console.log(message1);
        const text = content.innerHTML;
        console.log("3");
        content.innerHTML = text + message1;
        console.log("4");
      }
    }
  };
  request.send();
};
//加载JSON
getJSON.onclick = function () {
  const request = new XMLHttpRequest();
  request.open("GET", "/1.json");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      const arr = JSON.parse(request.response);
      let arrName = [];
      arr.map(function (item) {
        arrName.push(item.name);
        return arrName;
      });
      let arrAge = [];
      arr.map(function (item) {
        arrAge.push(item.age);
        return arrAge;
      });
      let arrSex = [];
      arr.map(function (item) {
        arrSex.push(item.sex);
        return arrSex;
      });
      arr.forEach((element, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${arrName[index]}</td><td>${arrAge[index]}</td><td>${arrSex[index]}</td>`;
        Tbody.appendChild(tr);
      });
    }
  };
  request.send();
};
//分页操作
let tag = 2;
getPage.onclick = function () {
  const request = new XMLHttpRequest();
  request.open("GET", `/public/${tag}.json`);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let arrTr = Array.from(document.querySelectorAll("tr"));
        for (let i = 1; i < arrTr.length; i++) {
          arrTr[i].remove();
        }
        const arr = JSON.parse(request.response);
        let arrName = [];
        arr.map(function (item) {
          arrName.push(item.name);
          return arrName;
        });
        let arrAge = [];
        arr.map(function (item) {
          arrAge.push(item.age);
          return arrAge;
        });
        let arrSex = [];
        arr.map(function (item) {
          arrSex.push(item.sex);
          return arrSex;
        });
        console.log(arrSex);
        arr.forEach((element, index) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${arrName[index]}</td><td>${arrAge[index]}</td><td>${arrSex[index]}</td>`;
          Tbody.appendChild(tr);
        });
        tag += 1;
      } else {
        alert("亲，没有更多数据啦");
      }
    }
  };
  request.send();
};
