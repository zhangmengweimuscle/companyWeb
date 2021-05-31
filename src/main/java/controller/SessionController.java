package controller;

import entity.Admin;
import org.springframework.web.bind.annotation.*;
import service.SessionService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Resource
    private SessionService sessionService;

    //登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody Boolean login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, @RequestBody Admin admin) throws IOException {
        return sessionService.login(httpServletRequest,httpServletResponse,admin);
    }
    //注销
    @RequestMapping(value = "/deleteSession", method = RequestMethod.POST)
    public  @ResponseBody Boolean deleteSession(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse)throws IOException{
        return sessionService.deleteSession(httpServletResponse,httpServletRequest);
    }
}
