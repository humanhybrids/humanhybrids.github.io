
define([
    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/cv.json",

    "text!./templates/cv.html",
    "text!./templates/app.html",
    "text!./templates/publication.html",
    "text!./templates/education.html",
    "text!./templates/position.html",
    "text!./templates/skill.html"
], function (compose, BaseElement, TemplateElement, cv,
    template, appTemplate, publicationTemplate, educationItemTemplate,
    positionTemplate, skillTemplate) {

        var AppItem = compose.element("cmc-app-item", TemplateElement, {
            templateString: appTemplate,
            set name(value) {
                this.nameNode.innerHTML = value;
            },
            set url(value) {
                this.linkNode.href = value;
            },
            set description(value) {
                this.descriptionNode.innerHTML = value;
            },
            set created(value) {
                this.createdNode.innerHTML = value;
            }
        });

        var Publication = compose.element("cmc-publication-item", TemplateElement, {
            templateString: publicationTemplate,
            set authors(values) {
                this.authorsNode.innerHTML = values.reduce(function (prev, current) {
                    if (prev.length > 0) {
                        prev += ", ";
                    }
                    prev += current.firstName.substring(0, 1) + ". ";
                    prev += current.lastName;
                    return prev;
                }, "");
            },
            set title(value) {
                this.titleNode.innerHTML = value;
            },
            set year(value) {
                this.yearNode.innerHTML = value;
            },
            set publication(value) {
                this.publicationNode.innerHTML = value;
            },
            set city(value) {
                this.cityNode.innerHTML = value;
            },
            set link(value) {
                this.linkNode.href = value.url;
                this.linkNode.innerHTML = value.text;
            }
        });

        var EducationItem = compose.element("cmc-education-item", TemplateElement, {
            templateString: educationItemTemplate,
            set "school-name"(schoolName) {
                this.schoolNameNode.innerHTML = schoolName;
            },
            set "field-of-study"(fieldOfStudy) {
                this.fieldOfStudyNode.innerHTML = fieldOfStudy;
            },
            set "start-date"(startDate) {
                this.startDateNode.innerHTML = startDate;
            },
            set "end-date"(endDate) {
                this.endDateNode.innerHTML = endDate;
            },
            set degree(degree) {
                this.degreeNode.innerHTML = degree;
            }
        });

        var Position = compose.element("cmc-position", TemplateElement, {
            templateString: positionTemplate,
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

        var Skill = compose.element("cmc-skill", TemplateElement, {
            templateString: skillTemplate,
            set name(name) {
                this.nameNode.innerHTML = name;
            }
        });

        var List = compose.element("cmc-list", BaseElement, {
            createdCallback: function () {
                var ItemType = this.itemType;
                this.data.forEach(function (item) { this.root.appendChild(new ItemType(item)); }, this);
            }
        });

        compose.element("cmc-apps", List, {
            itemType: AppItem,
            data: cv.apps,
            createdCallback: function () {
                this.inherited(arguments);
                this.style.display = "flex";
            }
        });
        compose.element("cmc-publications", List, { itemType: Publication, data: cv.publications });
        compose.element("cmc-educations", List, { itemType: EducationItem, data: cv.education });
        compose.element("cmc-positions", List, { itemType: Position, data: cv.positions });
        compose.element("cmc-skills", List, { itemType: Skill, data: cv.skills });
        return compose.element("cmc-cv", TemplateElement, { templateString: template });

    });
