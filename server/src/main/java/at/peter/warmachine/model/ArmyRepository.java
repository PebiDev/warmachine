package at.peter.warmachine.model;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArmyRepository extends JpaRepository<Army, Long> {

    @Transactional
    public List<Army> findByOrderById();

}
