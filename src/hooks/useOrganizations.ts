import useGetOrganizationsQuery from '@/hooks/use-get-organizations';
import { useEffect, useState } from 'react';

const useOrganizations = () => {
    const [organizations, setOrganizations] = useState<any>();
    const { data } = useGetOrganizationsQuery();

    useEffect(() => {
        if (data) {
            setOrganizations(data);
        }
    }, [data]);

    return organizations;
};

export default useOrganizations;
