package service;


import entity.Admin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface SessionService {
    Boolean login(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Admin admin)throws IOException;
    Boolean deleteSession(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest)throws IOException;
}
