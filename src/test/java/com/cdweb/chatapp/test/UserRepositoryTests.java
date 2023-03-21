package com.cdweb.chatapp.test;

import static org.assertj.core.api.Assertions.assertThat;

import com.cdweb.chatapp.Repository.TestModelRepository;
import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.TestModel;
import com.cdweb.chatapp.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private UserRepository repo;

    @Autowired
    private TestModelRepository testModelRepository;

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setEmail("asf@gmail.com");
        user.setPassword("Phi");
        user.setName("phi");


        User savedUser = repo.save(user);

        User existUser = entityManager.find(User.class, savedUser.getId());

        assertThat(user.getEmail()).isEqualTo(existUser.getEmail());

    }

    @Test
    public void testModel() {
        TestModel t = new TestModel();

        t.setName("Phi");



        TestModel t1 = testModelRepository.save(t);

        TestModel existTest = entityManager.find(TestModel.class, t1.getId());

        assertThat(t1.getName()).isEqualTo(existTest.getName());

    }
}
