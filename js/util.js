
define({
    safeget: function (source, propertyId) {
        return propertyId.split(".").reduce(function(src, property) {
            return src && (property in src ? src[property] : null);
        }, source);
    }
});
