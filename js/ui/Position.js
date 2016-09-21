
define([
    "compose",
    "layout/TemplateElement",
    "text!./templates/Position.html"
], function(compose, TemplateElement, template) {

    return compose.element("cmc-position", TemplateElement, {
        templateString: template,
        get cssRules() {
            return [
                ".right { float: right; }",
                ".sm { font-size: .8em; }",
                "div { text-align: justify; margin-bottom: .5em; }"
            ];
        },
        set company(company) {
            this.companyNode.innerHTML = company.name;
        },
        set title(title) {
            this.titleNode.innerHTML = title;
        },
        set summary(summary) {
            this.summaryNode.innerHTML = summary;
        },
        set "start-date"(startDate) {
            this.startDateNode.innerHTML = startDate;
        },
        set "end-date"(endDate) {
            if (endDate) {
                this.endDateNode.innerHTML = endDate;
            }
        },
        set "is-current"(isCurrent) {
            if (isCurrent) {
                this.endDateNode.innerHTML = "Present";
            }
        }
    });

})