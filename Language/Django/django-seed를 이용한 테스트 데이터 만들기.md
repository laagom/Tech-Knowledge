 > 📌 장고 게시판을 구현하기 위해 django-seed를 이용하여 임의의 데이터를 만들어보았다. 하지만 무작위 데이터를 생성하기 때문에 이번에는 코드를 작성하여 내가 원하는 데이터를 생성해보려고 한다.
>
> ➤ 둘러보기 : [Django 게시판](https://velog.io/@cjyooong/Django-%EA%B2%8C%EC%8B%9C%ED%8C%90)

<br>

## 🍃 seed를 이용하여 데이터 생성하기
### 1. django-seed 설치
> $ pip3 install django-seed
> $ pip3 install psycopg2
> $ pip3 freeze > requirements.txt

✔️ 먼저 데이터를 생성할 수 있게 도와주는 seed를 설치하자.

<br>

__📌 무작위 데이터 생성 방법__
> $ python3 manage.py seed shortener --number=30

✔️ 코드 작성 없이 seed만 사용하여 app에 작성된 모델의 데이터를 무작위로 생성하는 방법은 위의 커맨드를 실행시키면 된다.

✔️ 하지만 원하는 데이터를 만들기 위해 코드를 작성하여 커스텀 커맨드를 만들어보겠다.

<br>

### 2. 커맨드 파일 생성
![](https://velog.velcdn.com/images/cjyooong/post/ad8f68e2-83b4-4478-8303-162439052c00/image.png)

✔️ 코드를 작성하기 위한 커맨드 파일을 생성하자.
> - ango-admin으로 생성한 app 하위에 `management>commands` 폴더를 생성
- 코드를 작성할 `seed_data.py` 파일 생성
- `__init__.py` 파일 생성

📌 __\__init\__.py 파일의 역할__
>
> `__init__.py` 파일은 해당 디렉토리가 패키지의 일부임을 알려주는 역할을 한다. 만약 game, sound, graphic 등 패키지에 포함된 디렉토리에 `__init__.py`파일이 없다면 패키지로 인식하지 않는다.
> 
> 또한 패키지와 관련된 설정이나 초기화 코드를 포함할 수 있다.

<br>

### 3. 생성 코드 작성
> ```python
> from django.core.management.base import BaseCommand
>
>class Command(BaseCommand):
>    help = 'Create data of user and pay plan'
>
>    def add_arguments(self, parser):
>        parser.add_argument('-n', '--> number', required=True, type=int)
> ```

✔️ 커맨드에 생성할 데이터 수를 입력하기 위해 옵션 `--number` 추가하였다.

> $ python3 manage.py seed_data --number 50
> or
> $ python3 manage.py seed_data -n 50

✔️ 이는 커맨드 실행 시 위와 같이 사용이 된다.

> ```python
> import random
> from faker import Faker
> from django_seed import Seed
> from django.db import transaction
> from django.core.management.base import BaseCommand
> 
> from shortener.models import PayPlan, Users
>
> class Command(BaseCommand):
>
>    ...
>
>    def handle(self, *args, **options):
>        faker = Faker()
>        number = options['number']
>        price = lambda x: random.randint(000000, 999999)
>        
>        with transaction.atomic():
>            payplan_seeder = Seed.seeder()
>            payplan_seeder.add_entity(PayPlan, number, {
>                'price': price,
>            })
>            payplan_seeder.execute()
>
>            payplan = PayPlan.objects.all()
>            user_seeder = Seed.seeder()
>            user_seeder.add_entity(Users, number, {
>                'pay_plan': lambda x: random.choice(payplan),
>                'password': lambda x: faker.password(),
>            })
>            user_seeder.execute()
>        self.stdout.write(self.style.SUCCESS(f"{number} users created!"))
>```

✔️ handle()함수에 실행 소스를 작성하면 커맨드를 사용할 수 있다.
- 앞서 add_arguments() 함수에서 만들어둔 옵션의 number를 변수에 할당
- Pay Plan모델의 price필드에 사용할 값을 랜덤으로 지정
- Pay Plan 모델과 User의 동일한 트랜젝션에서의 데이터 생성을 위한 transaction.atomic()사용
- Seed에 대한 인스턴스 생성 후, 데이터를 만들 모델 PayPlan, Users와 데이터 수 자유롭게 변경하고 싶은 데이터를 넣어준다.
- Pay Plan에 대한 Seed 인스턴스를 execute()함수로 실행하게 되면 데이터가 생성
- User의 외래키로 생성되어있는 pay_plan 필드에 대하여 먼저 생성한 PayPlan 데이터를 넣기위해 위에서 생성한 playplan 데이터를 조회 후 필드 데이터로 랜덤으로 할당
- Users에 대한 Seed 인스턴스를 실행

> python3 manage.py seed_data -n 50

✔️ 위의 명령어로 50개의 데이터를 생성
![](https://velog.velcdn.com/images/cjyooong/post/e9f5f91e-bb61-491e-9be5-27146e9efee6/image.png)

✔️ 가격은 내가 지정한 범위 안의 정수가 랜덤으로 데이터 생성

![](https://velog.velcdn.com/images/cjyooong/post/058747e6-7f68-42ed-9a1b-3bf3aa681847/image.png)

✔️ 비밀번호는 faker를 사용한 랜덤 비밀번호 데이터 생성
