package service.Impl;

import entity.Admin;
import org.springframework.stereotype.Service;
import service.SessionService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Service
public class SessionServiceImpl implements SessionService {

    @Override
    public Boolean login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Admin admin) throws IOException {
        HttpSession httpSession = httpServletRequest.getSession(true);
        httpSession.setAttribute("username",admin.getUsername());
        return true;
    }

    @Override
    public Boolean deleteSession(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) throws IOException {
        HttpSession httpSession = httpServletRequest.getSession(false);
        System.out.println(httpSession);
        if(httpSession != null){
            System.out.println(httpSession + "正在被销毁");
            httpSession.removeAttribute("username");
            httpSession.invalidate();

        }
        httpSession = httpServletRequest.getSession(false);
        if(httpSession == null){
            System.out.println("销毁成功");
            return true;
        }
        return false;
    }
}
