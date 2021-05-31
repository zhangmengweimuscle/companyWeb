package service.Impl;

import dao.AdminMapper;
import entity.Admin;
import entity.AdminExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.AdminService;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminMapper adminMapper;

    @Override
    public Boolean checkAdmin(Admin admin) {
        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andUsernameEqualTo(admin.getUsername());

        List<Admin> list = adminMapper.selectByExample(example);
        for(Admin ad : list){
            if (admin.getPassword().equals(ad.getPassword())){
                return true;
            }
        }
        return false;
    }
}
