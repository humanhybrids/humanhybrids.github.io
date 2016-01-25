define(["page", "template", "data"], function(Page, Template) {
    var self = new Page();
    
    var main = new Template();
    self.setcontent("main", main.create());
    
    return self;
});