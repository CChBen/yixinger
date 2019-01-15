package com.cb.yixinger.controller;

import com.cb.yixinger.config.LoggerManage;
import com.cb.yixinger.entity.BaseMessage;
import com.cb.yixinger.entity.User;
import com.cb.yixinger.service.TranslatorService;
import com.cb.yixinger.service.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @Description: UserApiController
 * @author: YFZX-CB-1784 ChenBen
 * @create: 2018-11-30 11:33
 **/
@Controller
@RequestMapping("/User")
@Api(description = "用户信息")
public class UserApiController {
    @Autowired
    private UserService userService;
    @Autowired
    private TranslatorService translatorService;
    private static final Logger logger = LoggerFactory.getLogger(UserApiController.class);

    @LoggerManage(logDescription = "添加用户信息")
    @ApiOperation(value = "添加用户信息", notes = "添加用户信息 ", response = BaseMessage.class)
    @RequestMapping(value = "/addUser", produces = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<BaseMessage> addUser(@ApiParam(value = "用户", required = true) @RequestBody User user,
                                               @ApiParam(value = "前端传回的code", required = true) @RequestParam String code) {
        BaseMessage baseMessage = new BaseMessage();
        user.setOpenid(userService.getOpenId(code));
        userService.addUser(user);
        logger.info("添加用户 {} 成功", user.getNickName());
        baseMessage.setMessage("添加用户 " + user.getNickName() + " 成功");
        return baseMessage.response();
    }

    @LoggerManage(logDescription = "获取并翻译用户信息")
    @ApiOperation(value = "获取并翻译用户信息", notes = "获取并翻译用户信息 ", response = BaseMessage.class)
    @RequestMapping(value = "/getUser", produces = {"application/json"}, method = RequestMethod.GET)
    public ResponseEntity<BaseMessage> getUser(@ApiParam(value = "用户openid", required = true) @RequestParam(value = "openid", required = true) String openid,
                                               @ApiParam(value = "用户选择的翻译语言", required = true) @RequestParam(value = "language", required = true) String language) {
        BaseMessage baseMessage = new BaseMessage();
        User user = userService.getUser(openid);
        baseMessage.setData(user);
        logger.info("获取用户 {} 信息成功", user.getNickName());
        user = translatorService.translateUserInfo(user, language);
        logger.info("翻译用户 {} 信息成功", user.getNickName());
        baseMessage.setMessage("获取并翻译用户 " + user.getNickName() + " 信息成功");
        return baseMessage.response();
    }

    @LoggerManage(logDescription = "更改用户信息")
    @ApiOperation(value = "更改用户信息", notes = "更改用户信息 ", response = BaseMessage.class)
    @RequestMapping(value = "/updateUser", produces = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<BaseMessage> updateUser(@ApiParam(value = "用户信息", required = true) @RequestBody User user) {
        BaseMessage baseMessage = new BaseMessage();
        userService.updateUser(user);
        logger.info("修改用户 {} 信息成功", user.getNickName());
        baseMessage.setMessage("修改用户 " + user.getNickName() + " 信息成功");
        return baseMessage.response();
    }
}
