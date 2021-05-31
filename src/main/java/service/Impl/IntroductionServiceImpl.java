package service.Impl;

import dao.IntroductionMapper;
import entity.Introduction;
import entity.IntroductionWithBLOBs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.IntroductionService;

@Service
public class IntroductionServiceImpl implements IntroductionService {
    @Autowired
    IntroductionMapper introductionMapper;

    @Override
    public int updateIntroduction(IntroductionWithBLOBs introductionWithBLOBs) {
        introductionMapper.updateByPrimaryKeySelective(introductionWithBLOBs);
        return 0;
    }

    @Override
    public IntroductionWithBLOBs selectIntroduction() {
        IntroductionWithBLOBs introductionWithBLOBs = introductionMapper.selectByPrimaryKey(1);
        return introductionWithBLOBs;
    }
}
