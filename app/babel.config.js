module.exports = function () {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: ['@babel/plugin-syntax-jsx', 'nativewind/babel'],
    };
};
