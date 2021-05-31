package controller;

import entity.Admin;
import org.springframework.web.bind.annotation.*;
import service.AdminService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Resource
    private AdminService adminService;

    //验证登录
    @RequestMapping(value = "/checkAdmin", method = RequestMethod.POST)
    public @ResponseBody Boolean checkAdmin(@RequestBody Admin admin){
        return adminService.checkAdmin(admin);
    }
}
