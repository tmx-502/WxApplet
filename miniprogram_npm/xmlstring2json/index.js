module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1619771842511, function(require, module, exports) {
;(function(root){

  function Parser(xmlString) {
    this.xmlString = xmlString;
    this.cursor = -1;
    this.error = false;
    this.jsonObj = {};
    this.readDeclaration();
    this.startReadNode();
  }

  Parser.prototype.readDeclaration = function(){
    this.cursor = this.xmlString.indexOf('?>');
    if (this.xmlString.indexOf('<!DOCTYPE') > -1) {
      this.cursor = this.xmlString.indexOf(']>') + 2;
    }
    this.next();
  };

  Parser.prototype.startReadNode = function(){
    Object.assign(this.jsonObj, this.readNode());
  };

  Parser.prototype.readNode = function(sibling){
    var parent, node = {}, text, nextTest = /^[\s\n]*<(?!\/|!\[CDATA\[)/,
      openTagStop = this.xmlString.indexOf('>', this.cursor),
      openTag = this.readTag(this.xmlString.substring(this.cursor, openTagStop));

    Object.assign(node, openTag.nodeAttr);
    parent = {[openTag.nodeName]: node};
    this.cursor = openTagStop + 1; // '>'.length

    // not closed
    if (this.xmlString.indexOf('/>', this.cursor - 2) !== this.cursor - 2) {
      // child
      if (nextTest.test(this.xmlString.substring(this.cursor, this.cursor + 1024))) {
        this.next();
        Object.assign(node, this.readNode());
      }

      // text node
      text = this.readText(openTag.nodeName);
      if (text && !/^\s+$/.test(text)) node['#text'] = text;
    }

    // sibling
    if (nextTest.test(this.xmlString.substring(this.cursor, this.cursor + 1024))) {
      this.next();
      this.addChildren(sibling || parent, this.readNode(sibling || parent));
    }
    return parent;
  };

  Parser.prototype.readTag = function(tag){
    var nodeName = tag.split(/\s+/)[0], nodeAttr = {}, result = null,
        patt = /([^\s]+)=(['"])([^"']+?)(\2)|([^\s]+)=([^\s"']+)/g;
    while ((result = patt.exec(tag)) !== null) {
      if (result[1]) {
        nodeAttr['@' + result[1]] = transEntities(result[3]);
      } else if (result[5]) {
        nodeAttr['@' + result[5]] = transEntities(result[6]);
      }
    }
    return {nodeName, nodeAttr};
  };

  Parser.prototype.addChildren = function(parent, child){
    var k;
    for (k in child) {
      if (parent[k]) {
        if (!(parent[k] instanceof Array)) {
          parent[k] = [parent[k]];
        }
        parent[k].push(child[k]);
      } else {
        parent[k] = child[k];
      }
    }
  };

  Parser.prototype.readText = function(nodeName){
    var text = '', start = this.cursor,
      end = this.xmlString.indexOf('</' + nodeName + '>', start),
      cdStart = -1, cdEnd;
    if (end < 0) return text;
    while ((cdStart = this.xmlString.indexOf('<![CDATA[', start)) > -1 && cdStart < end) {
      text += transEntities(this.xmlString.substring(start, cdStart));
      cdEnd = this.xmlString.indexOf(']]>', cdStart);
      text += this.xmlString.substring(cdStart + 9, cdEnd);
      start = cdEnd + 3;
      end = this.xmlString.indexOf('</' + nodeName + '>', start);
    }
    text += transEntities(this.xmlString.substring(start, end));
    this.cursor = end + nodeName.length + 3; //'</'.length + '>'.length = 3
    return text;
  };

  Parser.prototype.next = function(){
    var index = this.xmlString.indexOf('<', this.cursor);
    this.cursor = this.xmlString.indexOf('<![CDATA[', index) === 0 ? this.cursor : index + 1;
  };

  Parser.prototype.toJson = function(){
    return this.jsonObj;
  };

  function transEntities(str){
    return str.replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, '\'');
  }

  function xml2json(xmlString) {
    var parser = new Parser(xmlString);
    if (!parser.error) {
      return parser.toJson();
    } else {
      return {};
    }
  }

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return xml2json;
    });
  } else if (typeof module === 'object') {
    module.exports = xml2json;
  } else {
    root.xml2json = xml2json;
  }

})(typeof global === 'object' && global || typeof window === 'object' && window || this);

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1619771842511);
})()
//# sourceMappingURL=index.js.map