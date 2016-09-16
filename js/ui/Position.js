
define([
    "compose",
    "layout/TemplateElement"
], function(compose, TemplateElement) {

    return compose.element("cmc-position", "li", TemplateElement, {
        templateString: '<b data-id="companyNode"></b> <i data-id="titleNode"></i> <div data-id="summaryNode"></div>',
        set company(company) {
            this.companyNode.innerHTML = company.name;
        },
        set title(title) {
            this.titleNode.innerHTML = title;
        },
        set summary(summary) {
            this.summaryNode.innerHTML = summary;
        }
    });

})