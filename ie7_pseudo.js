/*
Heavily inspired by https://github.com/kevindees/ie7_pseudo_elements
*/
document.createElement('iea');
document.createElement('ieb');
(function($){
  window.ie7pseudos =  function() {
      function set_element(rule, content, iee) {
        var $rule = $(rule);
        $rule.each(function(i, el) {
          var $this = $(this);
          if ($this.hasClass(iee)) {
            if (content) {
              $this.find('> ' + iee).html(content);
            }
          }
          else {
            $this.addClass(iee);
            if (iee == 'ieb') {
              $this.prepend($(document.createElement(iee)).html(content));
            }
            else {
              $this.append($(document.createElement(iee)).html(content));
            }
          }
        });
      }

      function make_content(content) {
          if(content == "\"\"" || content == "\'\'" || content == null) {
              content = ''; }
          else if(content.indexOf('url') == 0) {
              content = "<img src='"+content.replace(/url\(/g, '').replace(/\)/, '')+"' />";
          }
          else {
              content = content.substring(0, content.length-1).substring(1);
              document.createTextNode(content);
          }
          return content;
      }

      var css = document.styleSheets;
      for(var i = 0, j = css.length; i < j; i++) {
          var rules = css[i].rules;
          for(var x = 0, y = rules.length; x < y; x++) {
              var selector = rules[x].selectorText;
              if(selector.indexOf("> ieb") > 0 || selector.indexOf("> iea") > 0) {
                  var regex = /\>\s?ie[ab]/g;
                  var ruleStr = selector.replace(regex, '').replace(/\:[a-z]*/g, '');
                  var content = rules[x].style.content;
                  content = make_content(content);
                  if(selector.indexOf("> ieb") > 0) { var iee = "ieb" }
                  else { var iee = 'iea'}
                  set_element(ruleStr, content, iee);
              }
          }
      }
  };
  window.ie7pseudos();
})(jQuery);
